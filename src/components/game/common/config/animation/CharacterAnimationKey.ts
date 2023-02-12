export const CharacterAnimationKeys = [
  "idle-up",
  "idle-right",
  "idle-down",
  "idle-left",
  "move-up",
  "move-right",
  "move-down",
  "move-left",
] as const;

export type CharacterAnimationKey = (typeof CharacterAnimationKeys)[number];

export function isCharacterAnimationKey(
  key: any
): key is CharacterAnimationKey {
  return CharacterAnimationKeys.includes(key);
}

export const AnimationsPerRow = Array.of<CharacterAnimationKey[]>(
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
  if (cols.length > 1) console.log(key, row, cols, frames);
  return frames;
}

export function mkAnimationFramesFor(section: number) {
  return AnimationsPerRow.reduce(
    (animations, animation) => {
      animations[animation] = {
        key: animation,
        frames: framesFor(animation, section),
        frameRate: 4,
        repeat: -1,
      };
      return animations;
    },
    {} as Record<
      CharacterAnimationKey,
      Omit<Phaser.Types.Animations.Animation, "frames"> & {
        frames: number[];
      }
    >
  );
}
