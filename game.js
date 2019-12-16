var config = {
  type: Phaser.AUTO,
  //width: window.innerWidth * window.devicePixelRatio,
  //height: window.innerHeight * window.devicePixelRatio,
  width: 800,
  height: 600,
  scale: {
          //width: window.innerWidth * window.devicePixelRatio,
          //height: window.innerHeight * window.devicePixelRatio,
          //width: window.innerWidth,
          //height: window.innerHeight
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          //width:800,
          //height:600
      },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: true 
      }
  },
  scene: [
    SceneGame,
    SceneLevelDesign,
    SceneSplash,
    SceneMainMenu
  ]
};


var game = new Phaser.Game(config);

//window['game']['canvas'][game.device.fullscreen.request]();
//window.addEventListener('resize', resize(game));
  //resize(game);
/*window.addEventListener('resize', () => {
    game.resize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
});*/

console.log("window width : " + window.innerWidth)
console.log("window height : " + window.innerHeight)
function resize(game) {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = game.canvas.width / game.canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}
function resizeApp ()
{
	// Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
	let game_ratio		= window.innerWidth * window.devicePixelRatio / window.innerHeight * window.devicePixelRatio;

	// Make div full height of browser and keep the ratio of game resolution
	let div			= document.getElementById('phaser-app');
	div.style.width		= (window.innerHeight * game_ratio) + 'px';
	div.style.height	= window.innerHeight + 'px';

	// Check if device DPI messes up the width-height-ratio
	let canvas			= document.getElementsByTagName('canvas')[0];

	let dpi_w	= parseInt(div.style.width) / canvas.width;
	let dpi_h	= parseInt(div.style.height) / canvas.height;

	let height	= window.innerHeight * (dpi_w / dpi_h);
	let width	= height * game_ratio;

	// Scale canvas
	canvas.style.width	= width + 'px';
	canvas.style.height	= height + 'px';
}

//window.addEventListener('resize', resizeApp);
//window.addEventListener("orientationchange", resizeApp);
