const CharacterAnimationKeys = [
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
