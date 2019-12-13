class SceneLevelDesign extends Phaser.Scene {
  constructor() {
    super({ key: "SceneLevelDesign" });
    this.controls;
    this.scoreText;
  }

  preload() {
    //this.load.image("tiles", "tiles16blue.png");
    //this.load.tilemapCSV("map", "unicornlevel.csv");
    //this.load.image("tiles", "tuxmon32extruded.png");
    this.load.image("tiles", "spritesheet_tiles.png");
    this.load.tilemapTiledJSON("map", "data/unicorn128.json");
  }

  create() {
    // When loading a CSV map, make sure to specify the tileWidth and tileHeight!

//    const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
//    const tileset = map.addTilesetImage("tiles");
//    const layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y

    const map = this.make.tilemap({ key: "map" });
    //const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    const tileset = map.addTilesetImage("spritesheet_tiles", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '28px', fill: '#fff' });
    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;
    //camera.setViewport(0,-1300,800,map.heightInPixels)
    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(time,delta) {
     this.controls.update(delta);
  }
}
