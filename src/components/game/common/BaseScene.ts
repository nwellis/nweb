export default class BaseScene extends Phaser.Scene {
  readonly sprites = new Map<number, Phaser.GameObjects.Sprite>();

  constructor(config?: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }
}
