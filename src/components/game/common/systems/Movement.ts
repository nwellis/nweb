import Phaser from "phaser";
import { defineQuery, defineSystem, IWorld } from "bitecs";
import { Position, Velocity } from "../components/Physics";

export const mkMovementSystem = (scene: Phaser.Scene) => {
  const query = defineQuery([Position, Velocity]);

  return defineSystem((world: IWorld) => {
    const entities = query(world);
    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      Position.x[id] += Velocity.x[id];
      Position.y[id] += Velocity.y[id];
    }

    return world;
  });
};
