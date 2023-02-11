import Phaser from "phaser";
import { addComponent, addEntity, createWorld, IWorld, System } from "bitecs";
import { Position, Velocity } from "components/game/common/components/Physics";
import { mkSpriteSystem } from "../common/systems/Sprite";

export default class DemoScene extends Phaser.Scene {
  protected world: IWorld;
  protected systems = {
    sprite: undefined as System,
  };

  constructor() {
    super("Demo");
  }

  preload() {}

  create() {
    this.world = createWorld();

    const player = addEntity(this.world);
    addComponent(this.world, Position, player);

    Position.x[player] = 100;
    Position.y[player] = 100;

    this.systems.sprite = mkSpriteSystem(this, []);
  }

  update(t: number, dt: number) {
    this.systems.sprite(this);
  }
}
