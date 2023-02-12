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
import {
  Position,
  Rotation,
  Velocity,
} from "components/game/common/components/Physics";
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
  const query = defineQuery([Sprite, SpriteCharacter, Rotation, Velocity]);
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
        Object.values(config.entries).forEach(({ frames, ...animation }) => {
          sprite.anims.create({
            ...animation,
            frames: sprite.anims.generateFrameNumbers(config.texture, {
              frames,
            }),
          });
        });
        console.log(sprite.anims);
      }
    }

    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const eid = entities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      const isMoving = Math.abs(Velocity.x[eid] + Velocity.y[eid]) > 0;
      const angle = Rotation.angle[eid];

      let nextAnimation = sprite.anims.currentAnim?.key;
      if (angle < 45) {
        nextAnimation = isMoving ? "move-up" : "idle-up";
      } else if (angle < 135) {
        nextAnimation = isMoving ? "move-right" : "idle-right";
      } else if (angle < 225) {
        nextAnimation = isMoving ? "move-down" : "idle-down";
      } else {
        nextAnimation = isMoving ? "move-left" : "idle-left";
      }

      if (nextAnimation !== sprite.anims.currentAnim?.key) {
        sprite.play(nextAnimation);
      }
    }

    return world;
  });
};
