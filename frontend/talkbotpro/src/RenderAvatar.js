import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function RenderAvatar() {
    return (
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
            <color attach="background" args={["#000000"]} />
            <Experience />
        </Canvas>
    );
}

export default RenderAvatar;
