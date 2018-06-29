// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var xPos = edge;
var yPos = 362;

var characterWidth;
var characterHeight;

var playerSpeed = 10;

var character = "kid";

var boomerangX = -100;
var boomerangY = -100;

var boomerangWidth;
var boomerangHeight;

var swordWidth;
var swordHeight;

var boomerangStartX = -100;
var boomerangStartY = -100;

var boomerangSpeedX = 0;
var boomerangSpeedY = 0;

var warriorX = 1440 - edge * 2;
var warriorY = 362;

var warriorWidth;
var warriorHeight;

var state = 0;

var kidHealth = 100;
var warriorHealth = 100;

var gameover = false;

window.onload = function() { // when the page loads
	// define the canvas to the webpage
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// key events are handled
	window.addEventListener('keydown', keyInput, false);
	window.addEventListener('mousedown', mousedown, false);

	// run 30 frames per second
	var framesPerSecond = 60;
	setInterval(updateAll, 1000/framesPerSecond);
}

function mousedown(evt) {
  var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	clickX = evt.clientX - rect.left - root.scrollLeft;
	clickY = evt.clientY - rect.top - root.scrollTop;

  if (state == 1) {
    state = 1.1;
  } else if (state == 1.1) {
		state = 2;
	}
}

function keyInput(event) { // key events to control the direction of the snake
	// alert(event.keyCode);

  if (state == 2) {
    // code holds the number to map to a direction, using arrow-keys
  	var code = event.keyCode;

  	// make sure that the movement does not cause the snake to move into itself
  	if (code == 74) { // left
  		xPos -= playerSpeed;
  	} else if (code == 73) { // up
  		yPos-= playerSpeed;
  	} else if (code == 76) { // right
  		xPos += playerSpeed;
  	} else if (code == 75) { // down
  		yPos += playerSpeed;
  	} else if (code == 65) { // a
  		if (character == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = -10;
  				boomerangSpeedY = 0;
  			}
  		}
  	} else if (code == 87) { // w
  		if (character == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = 0;
  				boomerangSpeedY = -10;
  			}
  		}
  	} else if (code == 68) { // d
  		if (character == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = 10;
  				boomerangSpeedY = 0;
  			}
  		}
  	} else if (code == 83) { // s
  		if (character == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = 0;
  				boomerangSpeedY = 10;
  			}
  		}
  	} else if (code == 49) {
  		// character = "kid";
  		// speed = 10;
  	} else if (code == 50) {
  		// character = "warrior";
  		// speed = 12;
  	} else if (code == 51) {
  		// character = "wizard";
  		// speed = 7;
  	}
  }
}

function updateAll() { // call this with every frame
	// move and draw everything over the current canvas
	keepLegal();
	drawAll();
	moveAll();
}

function keepLegal() { // ensure that the current position of the player is still legal
	if (kidHealth <= 0) {
		kidHealth = 0;
		var r = confirm("Game over. Play again?");
		if (r == true) {
			window.open("stage1.html", "_self")
		}
	} else if (warriorHealth <= 0) {
		warriorHealth = 0;
		gameover = true;
		warriorX = -100;
		warriorY = -100;
	}

	if (gameover) {
		if (xPos > canvas.width) {
			window.open("stage2.html", "_self")
		}
	}

	if (xPos < edge) {
		xPos = edge;
	}

	if (yPos < edge) {
		yPos = edge;
	}

	if (xPos + characterWidth > canvas.width - edge && !gameover) {
		xPos = canvas.width - edge - characterWidth;
	}

	if (gameover && xPos + characterWidth > canvas.width - edge && (yPos < canvas.height / 2 - 40 || yPos + characterHeight > canvas.height / 2 + 40)) {
		xPos = canvas.width - edge - characterWidth;
	}

	if (yPos + characterHeight > canvas.height - edge) {
		yPos = canvas.height - edge - characterHeight;
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
  if (state == 0) {
		if (xPos >= 500) {
			state = 1;
	  }
	  xPos += 3;
	  warriorX -= 3;
	} else if (state == 2) {
    boomerangX += boomerangSpeedX;
  	boomerangY += boomerangSpeedY;

  	if (boomerangX < boomerangStartX - 600) {
  		boomerangSpeedX *= -1;
  	}

  	if (boomerangX > boomerangStartX + 600)  {
  		boomerangSpeedX *= -1;
  	}

  	if (boomerangY < boomerangStartY - 600) {
  		boomerangSpeedY *= -1;
  	}

  	if (boomerangY > boomerangStartY + 600) {
  		boomerangSpeedY *= -1;
  	}

  	if (boomerangX == boomerangStartX && boomerangY == boomerangStartY) {
  		boomerangX = -100;
  		boomerangY = -100;
  		boomerangSpeedX = 0;
  		boomerangSpeedY = 0;
  	}

		// 895 362
		// 775 242
		// 655 362
		// 775 482
		// console.log(warriorX + " " + warriorY);

		if (895 >= warriorX && warriorX > 775 && 362 >= warriorY && warriorY > 242) {
			warriorX -= 3;
			warriorY -= 3;
		} else if (775 >= warriorX && warriorX > 655 && 242 <= warriorY && warriorY < 362) {
			warriorX -= 3;
			warriorY += 3;
		} else if (655 <= warriorX && warriorX < 775 && 362 <= warriorY && warriorY < 482) {
			warriorX += 3;
			warriorY += 3;
		} else if (775 <= warriorX && warriorX < 895 && 482 >= warriorY && warriorY > 362) {
			warriorX += 3;
			warriorY -= 3;
		}
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

	if (gameover) {
		colorRect(canvas.width - edge, canvas.height / 2 - 40, edge, 80, 'black');
	}

	kid = new Image();
	kid.src = 'images/kid.png';

	warrior = new Image();
	warrior.src = 'images/warrior.png'

  warriorWidth = warrior.naturalWidth;
  warriorHeight = warrior.naturalHeight;

	canvasContext.drawImage(kid, 0, edge);
	canvasContext.font = "10px sans-serif";
	colorText(kidHealth, 0, edge + characterHeight + 10, 'black');

	if (!gameover) {
		canvasContext.drawImage(warrior, canvas.width - edge, edge);
		colorText(warriorHealth, canvas.width - edge, edge + warriorHeight + 10, 'black');
	} else {
		canvasContext.drawImage(warrior, 0, edge + characterHeight + 10 + 10);
		kidHealth = 100;
		warriorHealth = 100;
		colorText(warriorHealth, 0, edge + characterHeight + 10 + 10 + warriorHeight + 10, 'black');
	}

	if (character == "kid") {
		canvasContext.drawImage(kid, xPos, yPos);

		characterWidth = kid.naturalWidth;
		characterHeight = kid.naturalHeight;
	}

  canvasContext.drawImage(warrior, warriorX, warriorY);

	boomerang = new Image();
	boomerang.src = 'images/boomerang.png';
	canvasContext.drawImage(boomerang, boomerangX, boomerangY);

	boomerangWidth = boomerang.naturalWidth;
	boomerangHeight = boomerang.naturalHeight;

	if (overlap(boomerangX, boomerangY, boomerangWidth + boomerangX, boomerangHeight + boomerangY,
		warriorX, warriorY, warriorX + warriorWidth, warriorY + warriorHeight)) {
			warriorHealth -= 3;
		}

	sworddown = new Image();
	sworddown.src = 'images/sword/sworddown.png';

	swordleft = new Image();
	swordleft.src = 'images/sword/swordleft.png';

	swordup = new Image();
	swordup.src = 'images/sword/swordup.png';

	swordright = new Image();
	swordright.src = 'images/sword/swordright.png';

	swordWidth = swordleft.naturalWidth;
	swordHeight = swordleft.naturalHeight;

	if (xPos >= warriorX - swordWidth && xPos <= warriorX + warriorWidth && state == 2) {
		canvasContext.drawImage(swordleft, warriorX - swordWidth + 20, warriorY + warriorHeight / 2);
		if (overlap(xPos, yPos, xPos + characterWidth, yPos + characterHeight,
			warriorX - swordWidth + 20, warriorY + warriorHeight / 2, warriorX - swordWidth + 20 + swordWidth, warriorY + warriorHeight / 2 + swordHeight)) {
				kidHealth -= 1;
			}
	}

	if (yPos >= warriorY - swordHeight && yPos <= warriorY + warriorHeight && state == 2) {
		canvasContext.drawImage(swordup, warriorX + warriorWidth / 2 - 10, warriorY - swordHeight - 20);
		if (overlap(xPos, yPos, xPos + characterWidth, yPos + characterHeight,
			warriorX - swordWidth + 20, warriorY + warriorHeight / 2, warriorX - swordWidth + 20 + swordWidth, warriorY + warriorHeight / 2 + swordHeight)) {
				kidHealth -= 1;
			}
	}

	if (state == 1) {
		colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText("Kid: Please! Help me defeat the Imp!!", 470, 250, 'black');
	} else if (state == 1.1) {
		colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText("Warrior: No. You must defeat me first. Prove yourself worthy!!!", 470, 250, 'black');
	}
}

function overlap(x1, y1, X1, Y1, x2, y2, X2, Y2) {
	if (x1 > x2 && y1 > y2) {
		return overlap(x2, y2, X2, Y2, x1, y1, X1, Y1);
	}
	if (x1 <= x2 && x2 <= X1 && y1 <= y2 && y2 <= Y1) {
		return true;
	}
	if (x1 <= x2 && x2 <= X1 && y1 <= Y2 && Y2 <= Y1) {
		return true;
	}
	if (x1 <= X2 && X2 <= X1 && y1 <= Y2 && Y2 <= Y1) {
		return true;
	}
	if (x1 <= X2 && X2 <= X1 && y1 <= y2 && y2 <= Y1) {
		return true;
	}
	return false;
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

//10px sans-serif
// helper function to draw text
function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}