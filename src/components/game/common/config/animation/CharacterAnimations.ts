import { mkConfig } from "utils/Types";
import { SpriteSheetTexture } from "../SpriteSheets";
import { mkAnimationFramesFor } from "./CharacterAnimationKey";

export type CharacterAnimationsConfig = ReturnType<typeof mk>;
export type CharacterKey = keyof typeof CharacterAnimationConfig;

let cursor = 0;
const mk = <T extends string>(
  key: T,
  texture: SpriteSheetTexture,
  section: number
) => ({
  key,
  texture,
  characterId: ++cursor,
  for: mkAnimationFramesFor(section),
});

export const CharacterAnimationConfig = mkConfig(
  "key",
  mk("player-male", "characters", 1)
);

export const CharacterAnimationTextures = Object.values(
  CharacterAnimationConfig
).reduce((textures, config) => {
  textures[config.characterId] = config;
  return textures;
}, {} as Record<number, CharacterAnimationsConfig>);
