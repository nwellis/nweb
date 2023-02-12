import Phaser from "phaser";
import { defineQuery, defineSystem, IWorld } from "bitecs";
import { Rotation, Velocity } from "../components/Physics";
import { Player } from "../components/Player";

export const mkPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const velocity = 0.1;
  const query = defineQuery([Player, Velocity, Rotation]);

  return defineSystem((world: IWorld) => {
    const entities = query(world);
    for (let i = 0; i < entities.length; ++i) {
      const eid = entities[i];
      if (cursors.left.isDown) {
        Velocity.x[eid] = -velocity;
        Velocity.y[eid] = 0;
        Rotation.angle[eid] = 270;
      } else if (cursors.right.isDown) {
        Velocity.x[eid] = velocity;
        Velocity.y[eid] = 0;
        Rotation.angle[eid] = 90;
      } else if (cursors.up.isDown) {
        Velocity.x[eid] = 0;
        Velocity.y[eid] = -velocity;
        Rotation.angle[eid] = 0;
      } else if (cursors.down.isDown) {
        Velocity.x[eid] = 0;
        Velocity.y[eid] = velocity;
        Rotation.angle[eid] = 180;
      } else {
        Velocity.x[eid] = 0;
        Velocity.y[eid] = 0;
      }
    }

    return world;
  });
};
