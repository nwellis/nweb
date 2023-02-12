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
  entries: mkAnimationFramesFor(section),
});

export const CharacterAnimationConfig = mkConfig(
  "key",
  mk("player-male", "characters", 1)
);

export const CharacterKeys = Object.values(CharacterAnimationConfig).reduce(
  (textures, config) => {
    textures[config.characterId] = config.key;
    return textures;
  },
  {} as Record<number, CharacterKey>
);
