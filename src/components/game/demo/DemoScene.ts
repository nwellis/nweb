import { addComponent, addEntity, createWorld, IWorld } from "bitecs";
import Phaser from "phaser";
import {
  mkPositionComponent,
  mkVelocityComponent,
} from "components/game/common/components/Physics";

export default class DemoScene extends Phaser.Scene {
  protected world: IWorld;

  protected comp = {
    position: mkPositionComponent(),
    velocity: mkVelocityComponent(),
  };

  constructor() {
    super("Demo");
  }

  preload() {}

  create() {
    this.world = createWorld();
    const player = addEntity(this.world);

    addComponent(this.world, this.comp.position, player);

    this.comp.position.x[player] = 100;
    this.comp.position.y[player] = 100;
  }

  update(t: number, dt: number) {}
}
