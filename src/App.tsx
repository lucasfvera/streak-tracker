import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { MOTIVATIONAL_PHRASES } from "./phrases";

function App() {
    const [streak, setStreak] = useLocalStorage("current-streak", {
        value: 0,
        clickedToday: false,
        lastTimeClicked: new Date().getMinutes(),
    });

    const resetClicked = () =>
        setStreak((prev) => ({
            ...prev,
            clickedToday: false,
        }));

    useEffect(() => {
        const interval = setInterval(() => {
            if (!streak.clickedToday) return;
            const nextTime = new Date().getMinutes();
            if (streak.lastTimeClicked < nextTime) {
                resetClicked();
                console.log("checking", streak, nextTime);
            }
        }, 1000 * 2);

        return () => {
            clearInterval(interval);
        };
    }, [streak]);

    return (
        <div className="p-16 flex flex-col items-center gap-4 relative">
            <h1 className="text-2xl font-bold">Streak Tracker</h1>
            <p>Your streak is: {streak.value}</p>
            <p>{MOTIVATIONAL_PHRASES[streak.value]}</p>
            <button
                onClick={() =>
                    setStreak((prev) => ({
                        value: prev.value + 1,
                        clickedToday: true,
                        lastTimeClicked: new Date().getMinutes(),
                    }))
                }
                disabled={streak.clickedToday}
                className={`bg-green-300 rounded p-2 cursor-pointer hover:bg-green-500 transition-all disabled:bg-green-100 disabled:text-green-700`}
            >
                {streak.clickedToday ? "Congrats!" : "Mark today as complete"}
            </button>
            <button
                onClick={() => {
                    const reset = window.confirm(
                        "Are you sure you want to reset the streak counter?"
                    );
                    if (reset) {
                        setStreak({
                            value: 0,
                            clickedToday: false,
                            lastTimeClicked: new Date().getMinutes(),
                        });
                    }
                }}
                className="bg-red-700 text-red-50 rounded p-2 cursor-pointer hover:bg-red-900 transition-all absolute right-16 top-16"
            >
                Reset streak
            </button>
        </div>
    );
}

export default App;
