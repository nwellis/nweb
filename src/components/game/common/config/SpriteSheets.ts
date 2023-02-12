import { mkConfig } from "utils/Types";

export type SpriteSheetTexture = keyof typeof SpriteSheetConfig;

let cursor = 0;
const mk = <T extends string>(
  key: T,
  obj: Omit<Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig, "key">
) => ({
  textureId: ++cursor,
  key,
  ...obj,
});

export const SpriteSheetConfig = mkConfig(
  "key",
  mk("characters", {
    url: "game/characters.png",
    frameConfig: { frameWidth: 16, frameHeight: 16 },
  })
);

export const SpriteSheetTextures = Object.values(SpriteSheetConfig).reduce(
  (textures, config) => {
    textures[config.textureId] = config.key;
    return textures;
  },
  {} as Record<number, SpriteSheetTexture>
);
