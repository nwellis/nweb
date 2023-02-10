import Phaser from "phaser";
import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  IWorld,
} from "bitecs";
import { Sprite } from "components/game/common/components/Sprite";
import { Position } from "../components/Physics";

export const SpriteQuery = defineQuery([Sprite]);
export const SpriteQueryEnter = enterQuery(SpriteQuery);
export const SpriteQueryExit = exitQuery(SpriteQuery);

export const mkSpriteSystem = (scene: Phaser.Scene, textures: string[]) => {
  scene.data.set("SpritesById", new Map<number, Phaser.GameObjects.Sprite>());

  return defineSystem((world: IWorld) => {
    const spritesById: Map<number, Phaser.GameObjects.Sprite> =
      scene.data.get("SpritesById");

    const enterEntities = SpriteQueryEnter(world);
    for (let i = 0; i < enterEntities.length; i++) {
      const id = enterEntities[i];
      const textureId = Sprite.texture[id];
      const texture = textures[textureId];

      spritesById.set(id, scene.add.sprite(0, 0, texture));
    }

    const entities = SpriteQuery(world);
    for (let i = 0; i < entities.length; i++) {
      const id = entities[i];
      const sprite = spritesById.get(id);
      if (!sprite) {
        continue;
      }

      sprite.x = Position.x[id];
      sprite.y = Position.y[id];
    }

    const exitEntities = SpriteQueryExit(world);
    for (let i = 0; i < exitEntities.length; i++) {
      const id = entities[i];
      const sprite = spritesById.get(id);
      if (!sprite) {
        continue;
      }

      sprite.destroy(true);
      spritesById.delete(id);
    }

    return world;
  });
};
