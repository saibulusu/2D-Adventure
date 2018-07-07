// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var xPos = 0;
var yPos = 362;

var playerWidth;
var playerHeight;

var speed = 10;

var state = 1;

var kidHealth = 100;
var warriorHealth = 100;
var wizardHealth = 80;

var gameover = false;

var boomerangX = -100;
var boomerangY = -100;

var swordX = -100;
var swordY = -100;

var fireX = -100;
var fireY = -100;

window.onload = function() { // when the page loads
	// define the canvas to the webpage
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	window.addEventListener('keydown', keyInput, false);
  window.addEventListener('mousedown', mousedown, false);

	// run 30 frames per second
	var framesPerSecond = 60;
	setInterval(updateAll, 1000/framesPerSecond);
}

function keyInput(event) { // key events to control the direction of the snake
	// alert(event.keyCode);

	wizard = new Image();
	wizard.src = 'images/wizard.png';

	wizardWidth = wizard.naturalWidth;
	wizardHeight = wizard.naturalHeight;

	sworddown = new Image();
	sworddown.src = 'images/sworddown.png';

	swordleft = new Image();
	swordleft.src = 'images/swordleft.png';

	swordup = new Image();
	swordup.src = 'images/swordup.png';

	swordright = new Image();
	swordright.src = 'images/swordright.png';

	swordleftwidth = swordleft.naturalWidth;
	swordleftheight = swordleft.naturalHeight;

	swordupwidth = swordup.naturalWidth;
	swordupheight = swordup.naturalHeight;

  swordrightwidth = swordright.naturalWidth;
  swordrightheight = swordright.naturalWidth;

  sworddownwidth = sworddown.naturalWidth;
  sworddownheight = sworddown.naturalHeight;

  if (state == 2) {
    // code holds the number to map to a direction, using arrow-keys
  	var code = event.keyCode;

  	// make sure that the movement does not cause the snake to move into itself
  	if (code == 65) { // left
		left = true;
  	} else if (code == 87) { // up
		up = true;
  	} else if (code == 68) { // right
		right = true;
  	} else if (code == 83) { // down
		down = true;
  	} else if (code == 74) { // a
		if (player == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = -10;
  				boomerangSpeedY = 0;
  			}
  		} else if (player == "warrior") {
				canvasContext.drawImage(swordleft, xPos - 30, yPos + warriorHeight / 2);
				if (overlap(xPos - 30, yPos + warriorHeight / 2, xPos - 30 + swordleftwidth, yPos + warriorHeight / 2 + swordleftheight,
				wizardX, wizardY, wizardX + wizardWidth, wizardY + wizardHeight)) {
					wizardHealth -= 1;
				}
			}
  	} else if (code == 73) { // up
			if (player == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = 0;
  				boomerangSpeedY = -10;
  			}
  		} else if (player == "warrior") {
				canvasContext.drawImage(swordup, xPos, yPos - 40);
				if (overlap(xPos, yPos - 40, xPos + swordupwidth, yPos - 40 + swordupheight,
				wizardX, wizardY, wizardX + wizardWidth, wizardY + wizardHeight)) {
					wizardHealth -= 1;
				}
			}
  	} else if (code == 76) { // right
			if (player == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = 10;
  				boomerangSpeedY = 0;
  			}
  		} else if (player == "warrior") {
				canvasContext.drawImage(swordright, xPos + warriorWidth / 2, yPos + warriorHeight / 2);
				if (overlap(xPos + warriorWidth / 2, yPos + warriorHeight / 2, xPos + warriorWidth / 2 + swordleftwidth, yPos + warriorHeight / 2 + swordleftheight,
				wizardX, wizardY, wizardX + wizardWidth, wizardY + wizardHeight)) {
					wizardHealth -= 1;
				}
			}
  	} else if (code == 75) { // down
			if (player == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = 0;
  				boomerangSpeedY = 10;
  			}
  		} else if (player == "warrior") {
				canvasContext.drawImage(sworddown, xPos + warriorWidth / 2, yPos + warriorHeight / 2);
				if (overlap(xPos + warriorWidth / 2, yPos + warriorHeight / 2, xPos + warriorWidth / 2 + swordleftwidth, yPos + warriorHeight / 2 + swordleftheight,
				wizardX, wizardY, wizardX + wizardWidth, wizardY + wizardHeight)) {
					wizardHealth -= 1;
				}
			}
  	} else if (code == 65) { // a
			xPos -= playerSpeed;
  	} else if (code == 87) { // w
			yPos -= playerSpeed;
  	} else if (code == 68) { // d
			xPos += playerSpeed;
  	} else if (code == 83) { // s
			yPos += playerSpeed;
  	} else if (code == 49 && kidHealth > 0) {
  		player = "kid";
  		speed = 10;
  	} else if (code == 50 && warriorHealth > 0) {
  		player = "warrior";
  		speed = 12;
  	} else if (code == 51 && wizardHealth > 0) {
  		player = "wizard";
  		speed = 7;
  	}
  }
}


function mousedown(evt) {
  var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	clickX = evt.clientX - rect.left - root.scrollLeft;
	clickY = evt.clientY - rect.top - root.scrollTop;
}

function updateAll() { // call this with every frame
	// move and draw everything over the current canvas
	keepLegal();
  drawAll();
	moveAll();
  console.log(state);
}

function keepLegal() { // ensure that the current position of the player is still legal
	if (kidHealth <= 0 && warriorHealth <= 0 && wizardHealth <= 0) {
		kidHealth = 0;
		var r = confirm("Game over. Play again?");
		if (r == true) {
			window.open("stage4.html", "_self")
		}
	} else if (wizardHealth <= 0) { // the new enemy's health is less than or equal to 0
		warriorHealth = 0;
		gameover = true;
		wizardX = -100;
		wizardY = -100;
		fireX = -100;
		fireY = -100;
	} else if (kidHealth <= 0) {
		player = "warrior";
	} else if (warriorHealth <= 0) {
		player = "kid";
	}

	if (gameover) {
		if (xPos > canvas.width) {
			window.open("stage5.html", "_self")
		}
	}

	if (xPos < edge) {
		xPos = edge;
	}

	if (yPos < edge) {
		yPos = edge;
	}

	if (xPos + playerWidth > canvas.width - edge && !gameover) {
		xPos = canvas.width - edge - playerWidth;
	}

	if (gameover && xPos + playerWidth > canvas.width - edge && (yPos < canvas.height / 2 - 40 || yPos + playerHeight > canvas.height / 2 + 40)) {
		xPos = canvas.width - edge - playerWidth;
	}

	if (yPos + playerHeight > canvas.height - edge) {
		yPos = canvas.height - edge - playerHeight;
	}

	if (boomerangX != -100) {
		if (boomerangX < edge) {
			boomerangX = -100;
			boomerangY = -100;
			boomerangSpeedX = 0;
			boomerangSpeedY = 0;
		}

		if (boomerangY < edge) {
			boomerangX = -100;
			boomerangY = -100;
			boomerangSpeedX = 0;
			boomerangSpeedY = 0;
		}

		if (boomerangX + boomerangWidth > canvas.width - edge) {
			boomerangX = -100;
			boomerangY = -100;
			boomerangSpeedX = 0;
			boomerangSpeedY = 0;
		}

		if (boomerangY + boomerangHeight > canvas.height - edge) {
			boomerangX = -100;
			boomerangY = -100;
			boomerangSpeedX = 0;
			boomerangSpeedY = 0;
		}
	}
}

function moveAll() {
  if (state == 1) {
    if (xPos < 400) {
      xPos += 3;
    } else {
      state = 2;
    }
  } else if (state == 1.1) {

  }
}

function drawBackGround(color1, color2) {
	// white background for the canvas
	colorRect(0, 0, canvas.width, canvas.height, color1);

	// borders
	colorRect(0, 0, canvas.width, edge, color2);
	colorRect(0, 0, edge, canvas.height, color2);
	colorRect(0, canvas.height - edge, canvas.width, edge, color2);
	colorRect(canvas.width - edge, 0, edge, canvas.height, color2);
}

function drawAll() { // update the location of everything in the canvas
  drawBackGround('black', 'white');

	kid = new Image();
	kid.src = 'images/kid.png';

  var kidWidth = kid.naturalWidth;
  var kidHeight = kid.naturalHeight;

  warrior = new Image();
  warrior.src = 'images/warrior.png';

  var warriorWidth = warrior.naturalWidth;
  var warriorHeight = warrior.naturalHeight;

  wizard = new Image();
  wizard.src = 'images/wizard.png';

  var wizardWidth = wizard.naturalWidth;
  var wizardHeight = wizard.naturalHeight;

  playerWidth = kid.naturalWidth;
  playerHeight = kid.naturalHeight;

  canvasContext.drawImage(kid, 0, edge);
  canvasContext.font = "10px sans-serif";
  colorText(kidHealth, 0, edge + kidHeight + 10, 'black');
  canvasContext.drawImage(warrior, 0, edge + kidHeight + 10 + 10);
  canvasContext.font = "10px sans-serif";
  colorText(warriorHealth, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10, 'black');
  canvasContext.drawImage(wizard, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10 + 10);
  canvasContext.font = "10px sans-serif";
  colorText(wizardHealth, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10 + 10 + wizardHeight + 10, 'black');

  canvasContext.drawImage(kid, xPos, yPos);
}

// helper function to draw a square
function colorSquare(topLeftX, topLeftY, edge, color1, color2) {
	canvasContext.fillStyle = color1;
	canvasContext.fillRect(topLeftX, topLeftY, edge, edge, color1);
	canvasContext.fillStyle = color2;
	canvasContext.fillRect(topLeftX + 1, topLeftY + 1, edge - 2, edge - 2, color2);
}

// helper function to draw a rectangle
function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

// helper function to draw text
function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}
