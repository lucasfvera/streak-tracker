import { Canvas } from "@react-three/fiber"

export const CityGame = () => {

    return (
        <div id="canvas-container" className="flex flex-1 w-full">
            <Canvas>
                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </Canvas>
        </div>
    )
}