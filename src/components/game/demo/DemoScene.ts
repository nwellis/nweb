import Phaser from "phaser";
import { addComponent, addEntity, createWorld, IWorld, System } from "bitecs";
import {
  Position,
  Rotation,
  Velocity,
} from "components/game/common/components/Physics";
import { Sprite } from "../common/components/Sprite";
import { Player } from "../common/components/Player";
import { mkSpriteSystem } from "../common/systems/Sprite";
import { mkPlayerSystem } from "../common/systems/Player";
import { mkMovementSystem } from "../common/systems/Movement";
import {
  SpriteSheetConfig,
  SpriteSheetTextures,
} from "../common/config/SpriteSheets";

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
    Object.values(SpriteSheetConfig).forEach((config) =>
      this.load.spritesheet(config)
    );
  }

  create() {
    this.world = createWorld();

    this.addPlayer();
    this.systems.player = mkPlayerSystem(this.cursors);
    this.systems.movement = mkMovementSystem(this);
    this.systems.sprite = mkSpriteSystem(this, SpriteSheetTextures);
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
    Sprite.textureId[player] = SpriteSheetConfig["characters"].textureId;

    addComponent(this.world, Player, player);

    return player;
  }
}
