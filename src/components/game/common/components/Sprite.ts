import { defineComponent, Types } from "bitecs";

export const Sprite = defineComponent({
  textureId: Types.ui8,
});

export const SpriteCharacter = defineComponent({
  characterId: Types.ui8,
});
