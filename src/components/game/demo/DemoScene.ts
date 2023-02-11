import Phaser from "phaser";
import { addComponent, addEntity, createWorld, IWorld, System } from "bitecs";
import {
  Position,
  Rotation,
  Velocity,
} from "components/game/common/components/Physics";
import { mkSpriteSystem } from "../common/systems/Sprite";
import { Sprite } from "../common/components/Sprite";
import { mkMovementSystem } from "../common/systems/Movement";
import { Player } from "../common/components/Player";
import { mkPlayerSystem } from "../common/systems/Player";

export default class DemoScene extends Phaser.Scene {
  private static Width = 16 * 16; // 1024
  private static Height = 16 * 10; // 640
  static Scaling: Phaser.Types.Core.ScaleConfig = {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: this.Width,
    height: this.Height,
  };

  protected world: IWorld;
  protected systems = {
    sprite: undefined as System,
    movement: undefined as System,
    player: undefined as System,
  };

  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Demo");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.spritesheet("characters", "game/characters.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.world = createWorld();

    this.addPlayer();
    this.systems.player = mkPlayerSystem(this.cursors);
    this.systems.movement = mkMovementSystem(this);
    this.systems.sprite = mkSpriteSystem(this, ["player"]);
  }

  update(t: number, dt: number) {
    if (!this.world) return;

    this.systems.player(this.world);
    this.systems.movement(this.world);
    this.systems.sprite(this.world);
  }

  addPlayer() {
    const player = addEntity(this.world);

    addComponent(this.world, Position, player);
    Position.x[player] = this.scale.width / 2;
    Position.y[player] = this.scale.height / 2;

    addComponent(this.world, Rotation, player);
    Rotation.angle[player] = 0;

    addComponent(this.world, Velocity, player);
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;

    addComponent(this.world, Sprite, player);
    Sprite.texture[player] = 0;

    addComponent(this.world, Player, player);
    Sprite.texture[player] = 0;

    return player;
  }
}
