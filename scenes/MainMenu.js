class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("sprBg0", "sky.png");
  }

  create() {
    this.add.image(400, 300, 'sprBg0');
  }

  update() {

  }
}
