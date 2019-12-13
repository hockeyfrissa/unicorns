class SceneSplash extends Phaser.Scene {
  constructor() {
    super({ key: "SceneSplash" });
  }

  preload() {
    this.load.image("sky", "sky.png");
    this.load.image("unicorn", "unicorn.png");
    this.load.image('red', 'red.png');
  }

  create() {

    this.bg = this.add.image(game.config.width / 2, game.config.height / 2, 'sky');
    this.bg.setDisplaySize(game.config.width, game.config.height);
    this.title = this.add.text(game.config.width * 0.5, 128, "MAGIC UNICORNS AND A COWBOY", {
      fontFamily: 'monospace',
      fontSize: 38,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
    this.title.setInteractive();
    this.title.on("pointerup", function() {
          this.scene.start("SceneGame");
    }, this);

    var particles = this.add.particles('red');

           var emitter = particles.createEmitter({
               speed: 100,
               scale: { start: 0.5, end: 0 },
               blendMode: 'ADD'
           });

    this.unicorn = this.physics.add.image(1000, 350, 'unicorn');

    this.unicorn.on("pointerup", function() {
          this.scene.start("SceneLevelDesign");
    }, this);

    //unicorn.setVelocity(100, 200);
    this.unicorn.setBounce(1 , 1);
    this.unicorn.setCollideWorldBounds(true);
    emitter.startFollow(this.unicorn);

  }

  update() {

  }
}
