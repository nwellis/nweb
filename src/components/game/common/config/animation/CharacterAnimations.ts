import { tuple } from "utils/Types";
import { SpriteSheetTexture } from "../SpriteSheets";
import { CharacterAnimationKey } from "./CharacterAnimationKey";

export type CharacterAnimationsConfig = {
  texture: SpriteSheetTexture;
  for?: Record<
    CharacterAnimationKey,
    Phaser.Types.Animations.GenerateFrameNumbers
  >;
};

const mk = (config: CharacterAnimationsConfig) => config;

export const CharacterAnimations = {
  ["player-male"]: mk({
    texture: "characters",
  }),
};
