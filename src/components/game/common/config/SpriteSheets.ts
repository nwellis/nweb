import { mkConfig } from "utils/Types";

export type SpriteSheetTexture = keyof typeof SpriteSheets;

const mk = <T extends string>(
  key: T,
  obj: Omit<Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig, "key">
) => ({
  key,
  ...obj,
});

export const SpriteSheets = mkConfig(
  "key",
  mk("characters", {
    url: "game/characters.png",
    frameConfig: { frameWidth: 16, frameHeight: 16 },
  })
);
