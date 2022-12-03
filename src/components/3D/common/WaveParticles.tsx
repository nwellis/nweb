import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Points } from "three";
import { WavesShaderMaterial } from "./WaveParticles.shaders";

const SEPARATION = 128,
  AMOUNT_X = 80,
  AMOUNT_Y = 60,
  SPEED = 0.015,
  DOT_SCALING_FACTOR = 8,
  WAVE_ROUGHNESS = 0.7,
  WAVE_INTENSITY = 40;

const { positions, scales } = generateWavePoints();

function WaveParticles({ color = 0xfcfcfc }) {
  const particles = useRef<Points<BufferGeometry, Material | Material[]>>();
  const moveCount = useRef(0);
  const shader = WavesShaderMaterial(color);

  useFrame(() => {
    render(particles.current, moveCount.current);
    moveCount.current += SPEED;
  });

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial attach="material" args={[shader]} />
    </points>
  );
}

export default WaveParticles;

function generateWavePoints() {
  const numParticles = AMOUNT_X * AMOUNT_Y;

  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  const halfOfTotalX = (AMOUNT_X * SEPARATION) / 2;
  const halfOfTotalY = (AMOUNT_Y * SEPARATION) / 2;

  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNT_X; ix++) {
    for (let iy = 0; iy < AMOUNT_Y; iy++) {
      positions[i] = ix * SEPARATION - halfOfTotalX; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - halfOfTotalY; // z

      scales[j] = 1;

      i += 3;
      j++;
    }
  }

  return { positions, scales };
}

function render(particles, count) {
  const positions = particles.geometry.attributes.position?.array || [];
  const scales = particles.geometry.attributes.scale?.array || [];

  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNT_X; ix++) {
    for (let iy = 0; iy < AMOUNT_Y; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3 * WAVE_ROUGHNESS) * WAVE_INTENSITY +
        Math.sin((iy + count) * 0.5 * WAVE_ROUGHNESS) * WAVE_INTENSITY;

      scales[j] =
        (Math.sin((ix + count) * 0.3 * WAVE_ROUGHNESS) + 1.4) *
          DOT_SCALING_FACTOR +
        (Math.sin((iy + count) * 0.5 * WAVE_ROUGHNESS) + 1.4) *
          DOT_SCALING_FACTOR;
      i += 3;
      j++;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;
}
