import Phaser from "phaser";
import { defineQuery, defineSystem, IWorld } from "bitecs";
import { Velocity } from "../components/Physics";
import { Player } from "../components/Player";

export const mkPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const velocity = 0.1;
  const query = defineQuery([Player, Velocity]);

  return defineSystem((world: IWorld) => {
    const entities = query(world);
    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      if (cursors.left.isDown) {
        Velocity.x[id] = -velocity;
        Velocity.y[id] = 0;
      } else if (cursors.right.isDown) {
        Velocity.x[id] = velocity;
        Velocity.y[id] = 0;
      } else if (cursors.up.isDown) {
        Velocity.x[id] = 0;
        Velocity.y[id] = -velocity;
      } else if (cursors.down.isDown) {
        Velocity.x[id] = 0;
        Velocity.y[id] = velocity;
      } else {
        Velocity.x[id] = 0;
        Velocity.y[id] = 0;
      }
    }

    return world;
  });
};
