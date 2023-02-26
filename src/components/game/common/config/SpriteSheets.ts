import { mkConfig } from "utils/Types";

export type SpriteSheetTexture = keyof typeof SpriteSheetConfig;

let cursor = 0;
const mk = <T extends string>(
  key: T,
  obj: Omit<Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig, "key">
) => ({
  key,
  textureId: ++cursor,
  ...obj,
});

export const SpriteSheetConfig = {
  characters: mk("characters", {
    url: "game/characters.png",
    frameConfig: { frameWidth: 16, frameHeight: 16 },
  }),
  tiles: mk("tiles", {
    url: "game/basictile.png",
    frameConfig: { frameWidth: 16, frameHeight: 16 },
  }),
};

// https://github.com/NateTheGreatt/bitECS/blob/84d5905c39e396fdeb597030d0a1d5a5ce5d5292/docs/FAQ.md
export const SpriteSheetTextures = Object.values(SpriteSheetConfig).reduce(
  (textures, config) => {
    textures[config.textureId] = config.key;
    return textures;
  },
  {} as Record<number, SpriteSheetTexture>
);

Object.freeze(SpriteSheetTextures);
