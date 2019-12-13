class SceneGame extends Phaser.Scene {


  constructor() {
    super({ key: "SceneGame" });
    this.platforms;
    this.unicorns;
    this.badguys;
    this.witch;
    this.player;
    this.cursors;
    this.score = 0;
    this.scoreText;
    this.sfxText;
    this.fullText;
    this.jumptimer = 0;
    this.gameOver = false;
    this.jumping = false;
    this.music;
    this.musicOn = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.touchJump = false;
    this.touchLeft;
    this.touchRight;
    this.touchJump1;
    this.touchJump2;
    this.fivePoints;
  }



  preload() {
    /*Map*/
    //this.load.image("tiles", "tuxmon32extruded.png");
    this.load.image("tiles", "goodly-2x.png");
    this.load.tilemapTiledJSON("map", "data/unicorn32.json");

    /*Images*/
    this.load.image("unicorn", "unicorn.png");
    this.load.image("badguy", "badguy.png");
    this.load.image("witch", "witch.png");
    this.load.image("forest","forestbackground.png")
    this.load.image("coin5p", "coin5p.png");
    //this.load.image('red', 'red.png');

    /*Sprites*/
    //this.load.atlas("atlas", "atlas.png", "atlas.json");
    //this.load.spritesheet('dude', 'hero2.png', { frameWidth: 58, frameHeight: 96 });
    this.load.image('dude','hero3.png')
    this.load.audio('bg', ['unicorn.mp3']);
  }

  create() {
  //  this.scale.startFullscreen()
    this.music = this.sound.add('bg', { loop: true,volume:0.5 });
    if (this.musicOn) {
        this.music.play()
    }
    this.bg = this.add.image(game.config.width / 2, game.config.height / 2, 'forest');
    this.bg.setDisplaySize(game.config.width, game.config.height);
    this.bg.setScrollFactor(0)

    const map = this.make.tilemap({ key: "map" });

    //const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    const tileset = map.addTilesetImage("goodly-2x", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    //aboveLayer.setDepth(10);

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    this.fivePoints = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    const fivePointsObj = map.getObjectLayer('5p')['objects'];
    fivePointsObj.forEach(fiver => {
      // Add new spikes to our sprite group, change the start y position to meet the platform
      const five = this.fivePoints.create(fiver.x, fiver.y, 'coin5p').setOrigin(0, 0);
    });
    /*this.player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
    .setSize(30, 40)
    .setOffset(0, 24);*/
    this.physics.world.setBounds(0, 0, map.widthInPixels,  map.heightInPixels, true, true, true, true);

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.5)


    const camera = this.cameras.main;
    console.log("map height : " + map.heightInPixels)
    console.log("map width : " + map.widthInPixels)
    console.log("pixel ratio : " + window.devicePixelRatio)
    let viewPortY = -Math.abs(map.heightInPixels-(window.innerHeight/2));
    viewPortY = -Math.abs(1320)
    console.log(viewPortY)


    //camera.setViewport(0,viewPortY,800,map.heightInPixels)
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player);
    //camera.setRoundPixels(true);



    //this.unicorns = this.physics.add.group();
    /*this.unicorn = this.unicorns.create(400, 1300, 'unicorn');
    this.unicorn = this.unicorns.create(200, 1200, 'unicorn');
    this.unicorn = this.unicorns.create(600, 1400, 'unicorn');
    this.unicorn = this.unicorns.create(200, 1500, 'unicorn');*/
    this.unicorns = this.physics.add.group({
          key: 'unicorn',
          repeat: 50,
          setXY: { x: 10, y: 0, stepX: 20,stepY: 30 }
      })

    for (var a = 0;a<this.unicorns.children.entries.length;a++){
      this.unicorns.children.entries[a].setBounce(1)
      this.unicorns.children.entries[a].setCollideWorldBounds(true);
      this.unicorns.children.entries[a].setVelocity(Phaser.Math.Between(-100, 100), 20);
      this.unicorns.children.entries[a].allowGravity = false;
      this.unicorns.children.entries[a].setScale(0.2)
    }

    this.badguys = this.physics.add.group({
      key : 'badguy',
      repeat : 2,
      setXY : { x: 10, y: 400, stepX: 30,stepY: 380 },
      setScale: { x:0.2, y:0.2, stepX:0, stepY:0 },
    });
    for (var a = 0;a<this.badguys.children.entries.length;a++){
      this.badguys.children.entries[a].setBounce(1);
      this.badguys.children.entries[a].setCollideWorldBounds(true);
      //this.badguys.children.entries[a].setVelocity(Phaser.Math.Between(-100, 100), 20);
      this.badguys.children.entries[a].setVelocity(20, 20);
      this.badguys.children.entries[a].allowGravity = false;
    }

    this.witches = this.physics.add.group();
    this.witch = this.witches.create(100,1400,'witch');
    this.witch.setBounce(1)
    this.witch.setCollideWorldBounds(true);
    this.witch.setVelocity(Phaser.Math.Between(-200, 200), 20);
    this.witch.allowGravity = false;
    //this.witch.setScale(0.08)
    this.witch.setDisplaySize(44, 64);
    //this.witch.setSize(200, 200, true);



    /*this.unicorns.setBounce(1);
    this.unicorns.setCollideWorldBounds(true);
    this.unicorns.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.unicorns.allowGravity = false;
    this.unicorns.setScale(0.3);*/

    this.physics.add.collider(this.witches, worldLayer);
    this.physics.add.collider(this.unicorns, worldLayer);
    this.physics.add.collider(this.badguys, worldLayer);

    this.physics.add.collider(this.player, worldLayer);

    this.physics.add.overlap(this.player, this.fivePoints, collectCoin5p, null, this);

    this.physics.add.overlap(this.player, this.unicorns, catchUnicorn, null, this);
    this.physics.add.overlap(this.badguys, this.unicorns, eatUnicorn, null, this);
    this.physics.add.overlap(this.player, this.witches, gameOver, null, this);

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '28px', fill: '#fff' });
    this.scoreText.setScrollFactor(0)
    this.sfxText = this.add.text(666, 16, 'sfx', { fontSize: '28px', fill: '#fff' });
    this.sfxText.setInteractive().on('pointerdown',function(){
      if(this.musicOn){
        this.music.stop()
        this.musicOn = false;
      }else{
        this.music.play()
        this.musicOn = true;
      }
    },this)
    this.sfxText.setScrollFactor(0);

    this.fullText = this.add.text(500,16,'F',{fontSize:'28px',fill:'#fff'});
    this.fullText.setScrollFactor(0)

    this.fullText.setInteractive().on('pointerdown',function(){
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen()
        // On stop fulll screen
      } else {
        this.scale.startFullscreen()
        // On start fulll screen
      }
    },this)

    this.input.addPointer(3);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.touchLeft = this.add.text(15, 450, 'o', { fontSize: '178px', fill: '#fff' });
    this.touchLeft.setScrollFactor(0)
    this.touchRight = this.add.text(700, 450, 'o', { fontSize: '178px', fill: '#fff' });
    this.touchRight.setScrollFactor(0)
    this.touchJump1 = this.add.text(15, 340, 'o', { fontSize: '178px', fill: '#fff' });
    this.touchJump1.setScrollFactor(0)
    this.touchJump2 = this.add.text(700, 340, 'o', { fontSize: '178px', fill: '#fff' });
    this.touchJump2.setScrollFactor(0)

    /*this.graphics2 = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    var circle = new Phaser.Geom.Circle(36, 540, 50);
    this.graphics2.setScrollFactor(0)
    this.graphics2.fillCircleShape(circle);
    this.add.existing(this.graphics2);*/
    this.touchLeft.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
      console.log("hej afhasdf")
      this.moveLeft = true;
    },this);
    this.touchLeft.setInteractive().on('pointerup', function(pointer, localX, localY, event){
      this.moveLeft = false;
    },this);
    this.touchLeft.setInteractive().on('pointerout', function(pointer, localX, localY, event){
      this.moveLeft = false;
    },this);
    this.touchRight.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
      console.log("hej afhasdf")
      this.moveRight = true;
    },this);
    this.touchRight.setInteractive().on('pointerup', function(pointer, localX, localY, event){
      this.moveRight = false;
    },this);
    this.touchRight.setInteractive().on('pointerout', function(pointer, localX, localY, event){
      this.moveRight = false;
    },this);
    this.touchJump1.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
      this.touchJump = true;
    },this);
    this.touchJump1.setInteractive().on('pointerup', function(pointer, localX, localY, event){
      this.touchJump = false;
    },this);
    this.touchJump2.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
      this.touchJump = true;
    },this);
    this.touchJump2.setInteractive().on('pointerup', function(pointer, localX, localY, event){
      this.touchJump = false;
    },this);

    /*this.input.on('pointerdown', function(){
        this.moveLeft = true;
    }, this);
    this.input.on('pointerup', function(pointer){
        this.moveLeft = false;
    },this);*/
    this.player.setActive(true)
  }

  update() {

    if(this.unicorns.countActive()==0){
      this.gameOver = true;
      console.log("all unicorns gone")
    }

    if (this.gameOver)
    {
        //Gör någon snygg game over här
        return;
    }
    if(this.player.body.blocked.down){
      this.jumping = false;
      this.player.setGravityY(350);
    }
    if (this.cursors.left.isDown || this.moveLeft)
    {
        this.player.setVelocityX(-160);

        //player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown || this.moveRight)
    {

        this.player.setVelocityX(160);

        //player.anims.play('right', true);
    }
    /*else if (this.cursors.down.isDown && this.jumping){
        this.player.setVelocityY(600);
    }*/
    else
    {

        this.player.setVelocityX(0);
        if(!this.cursors.up.isDown  && this.jumping && !this.player.body.blocked.down){
          this.player.setGravityY(1200);
        }
        //player.anims.play('turn');
    }

    if ((this.cursors.up.isDown || this.touchJump) && this.player.body.blocked.down )
    //if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.jumptimer++ //game.getTime()
        this.player.setVelocityY(-550);
        this.player.setGravityY(350);
        this.jumping = true;
    }

  }
}
function eatUnicorn(badguy, unicorn)
{
    for(var a=0;a<10;a++){
      //Gör någon animation här
      unicorn.setScale(0.1);
    }
    unicorn.disableBody(true, true);

    this.score -= 10;
    this.scoreText.setText('Score: ' + this.score);
}
function catchUnicorn(player, unicorn)
{
    unicorn.disableBody(true, true);

    this.score += 100;
    this.scoreText.setText('Score: ' + this.score);
}
function collectCoin5p(player,coin){
  coin.disableBody(true,true);
  this.score += 5;
  this.scoreText.setText('Score: ' + this.score);
}
function gameOver(player, badguy)
{
    this.physics.pause();
    this.gameOver = true;
    //player.disableBody(true, true);
}
