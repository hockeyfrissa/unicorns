function addMobileControls(_this){
  _this.touchLeft = _this.add.text(15, 450, 'o', { fontSize: '178px', fill: '#fff' });
  _this.touchLeft.setScrollFactor(0)
  _this.touchRight = _this.add.text(700, 450, 'o', { fontSize: '178px', fill: '#fff' });
  _this.touchRight.setScrollFactor(0)
  _this.touchJump1 = _this.add.text(15, 340, 'o', { fontSize: '178px', fill: '#fff' });
  _this.touchJump1.setScrollFactor(0)
  _this.touchJump2 = _this.add.text(700, 340, 'o', { fontSize: '178px', fill: '#fff' });
  _this.touchJump2.setScrollFactor(0)
  _this.touchLeft.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    _this.moveLeft = true;
  },_this);
  _this.touchLeft.setInteractive().on('pointerup', function(pointer, localX, localY, event){
    _this.moveLeft = false;
  },_this);
  _this.touchLeft.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    _this.moveLeft = false;
  },_this);
  _this.touchRight.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    console.log("hej afhasdf")
    _this.moveRight = true;
  },_this);
  _this.touchRight.setInteractive().on('pointerup', function(pointer, localX, localY, event){
    _this.moveRight = false;
  },_this);
  _this.touchRight.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    _this.moveRight = false;
  },_this);
  _this.touchJump1.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    _this.touchJump = true;
  },_this);
  _this.touchJump1.setInteractive().on('pointerup', function(pointer, localX, localY, event){
    _this.touchJump = false;
  },_this);
  _this.touchJump2.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    _this.touchJump = true;
  },_this);
  _this.touchJump2.setInteractive().on('pointerup', function(pointer, localX, localY, event){
    _this.touchJump = false;
  },_this);
}
