import BaseScene from "components/game/common/BaseScene";
import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  IWorld,
} from "bitecs";
import {
  Sprite,
  SpriteCharacter,
} from "components/game/common/components/Sprite";
import { Position } from "components/game/common/components/Physics";
import {
  CharacterAnimationConfig,
  CharacterKey,
} from "components/game/common/config/animation/CharacterAnimations";

export const mkSpriteSystem = (
  scene: BaseScene,
  textures: Record<number, string>
) => {
  const query = defineQuery([Sprite]);
  const queryEnter = enterQuery(query);
  const queryExit = exitQuery(query);

  return defineSystem((world: IWorld) => {
    const enterEntities = queryEnter(world);
    for (let i = 0; i < enterEntities.length; i++) {
      const eid = enterEntities[i];
      const textureId = Sprite.textureId[eid];
      const texture = textures[textureId];

      scene.sprites.set(eid, scene.add.sprite(0, 0, texture));
    }

    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const eid = entities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      sprite.x = Position.x[eid];
      sprite.y = Position.y[eid];
    }

    const exitEntities = queryExit(world);
    for (let i = 0; i < exitEntities.length; i++) {
      const eid = entities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      sprite.destroy(true);
      scene.sprites.delete(eid);
    }

    return world;
  });
};

export const mkSpriteCharacterSystem = (
  scene: BaseScene,
  animations: Record<number, CharacterKey>
) => {
  const query = defineQuery([Sprite, SpriteCharacter]);
  const queryEnter = enterQuery(query);

  return defineSystem((world: IWorld) => {
    const enterEntities = queryEnter(world);
    for (let i = 0; i < enterEntities.length; i++) {
      const eid = enterEntities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      const animation = animations[SpriteCharacter.characterId[eid]];
      if (animation) {
        const config = CharacterAnimationConfig[animation];
        Object.values(config.for).forEach(({ frames, ...animation }) => {
          sprite.anims.create({
            ...animation,
            frames: sprite.anims.generateFrameNumbers(config.texture, {
              frames,
            }),
          });
        });

        sprite.play("move-down");
      }
    }

    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const id = enterEntities[i];
      const sprite = scene.sprites.get(id);
      if (!sprite) {
        continue;
      }
    }

    return world;
  });
};
