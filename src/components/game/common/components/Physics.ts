import { defineComponent, Types } from "bitecs";

const Vector2 = { x: Types.f32, y: Types.f32 };

export const Position = defineComponent(Vector2);
export const Velocity = defineComponent(Vector2);
export const Rotation = defineComponent({ angle: Types.f32 });
