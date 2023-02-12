import { SpriteSheetTexture } from "../SpriteSheets";
import { CharacterAnimationKey } from "./CharacterAnimationKey";

export type CharacterAnimationsConfig = {
  texture: SpriteSheetTexture;
  for: Partial<
    Record<CharacterAnimationKey, Phaser.Types.Animations.GenerateFrameNumbers>
  >;
};

const AnimationsPerRow = Array.of<CharacterAnimationKey[]>(
  ["idle-down", "move-down"], // Row 0 (down), column 0 and 2 is moving, 1 is idle
  ["idle-left", "move-left"], // Row 1 (left), column 0 and 2 is moving, 1 is idle
  ["idle-right", "move-right"], // Row 2 (right), column 0 and 2 is moving, 1 is idle
  ["idle-up", "move-up"] // Row 3 (up), column 0 and 2 is moving, 1 is idle
).flatMap((animations) => animations);

/**
 * Characters within characters.png are sections in a 2 row by 4 column grid with the same
 * exact pattern. Knowing which section in the grid we want to create, we can generate all
 * animations since we know the pattern. Within a section is a 4 row by 3 column sprite frames.
 */
function framesFor(key: CharacterAnimationKey, section: number) {
  const sectionRowShift = Math.floor(section / 4) * 4; // 4 sections per row, 4 rows in a section
  const animationRowShift = Math.floor(AnimationsPerRow.indexOf(key) / 2); // 2 animations per row
  const row = sectionRowShift + animationRowShift;

  const sectionColShift = (section % 4) * 3; // 4 sections per row, 3 columns in a section
  const animationColShifts = key.startsWith("idle")
    ? [1] // In the middle of the two moving animations
    : [0, 2]; // At each end is the move animations
  const cols = animationColShifts.map((col) => col + sectionColShift);

  const frames = cols.map((col) => row * 12 + col);
  // console.log(key, row, cols, frames);
  return frames;
}

function mk(
  config: Omit<CharacterAnimationsConfig, "for">,
  section: number
): CharacterAnimationsConfig {
  return {
    ...config,
    for: AnimationsPerRow.reduce((frames, animation) => {
      frames[animation] = {
        frames: framesFor(animation, section),
      };
      return frames;
    }, {} as Record<CharacterAnimationKey, Phaser.Types.Animations.GenerateFrameNumbers>),
  };
}

export const CharacterAnimations = {
  ["player-male"]: mk({ texture: "characters" }, 1),
};
