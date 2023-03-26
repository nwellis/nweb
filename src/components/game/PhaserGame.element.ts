import Phaser from "phaser";

export class PhaserGameElement extends HTMLElement {
  static readonly HTML_TAG = "phaser-game";
  static get observedAttributes() {
    return ["game-config"];
  }

  private game: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;

  constructor() {
    super();
  }

  startGame(partialConfig: Partial<Phaser.Types.Core.GameConfig> = {}) {
    this.stopGame();

    this.config = {
      type: Phaser.AUTO,
      parent: this,
      antialias: false,
      antialiasGL: false,
      banner: import.meta.env.DEV,
      ...partialConfig,
    };
    this.game = new Phaser.Game(this.config);

    return this;
  }

  stopGame() {
    this.config = {};
    this.game?.destroy(false);
    this.game = undefined;

    return this;
  }

  addScene(...args: Parameters<typeof this.game.scene.add>) {
    if (this.game?.scene.keys[args[0]]) {
      return this;
    }

    this.game.scene.add(...args);

    return this;
  }

  destroyScene(key: string) {
    if (!this.game) return this;

    this.game.scene.remove(key);

    return this;
  }
}
