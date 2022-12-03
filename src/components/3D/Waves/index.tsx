import { Canvas } from "@react-three/fiber";
import WaveParticles from "../common/WaveParticles";

export type WavesProps = {
  colorHex?: number;
};

function Waves({ colorHex }: WavesProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 1000, 900], fov: 45, near: 1, far: 4000 }}
      >
        <ambientLight />
        <WaveParticles color={colorHex} />
      </Canvas>
    </div>
  );
}

export default Waves;
