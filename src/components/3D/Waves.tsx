import React from "react";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import WaveParticles from "./common/WaveParticles";

export type WavesProps = {
  colorHex?: number;
} & React.HTMLAttributes<HTMLDivElement>;

function Waves({ colorHex, className, ...rest }: WavesProps) {
  return (
    <div className={clsx(className || "h-full w-full")} {...rest}>
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
