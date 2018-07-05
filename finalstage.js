// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var xPos = 720;
var yPos = 362;

var playerwidth;
var playerheight;

var fireballWidth;
var fireballHeight;

var fireX = -100;
var fireY = -100;
var fireSpeedX = 0;
var fireSpeedY = 0;

var speed = 10;

var player = "kid";

var boomerangX = -100;
var boomerangY = -100;

var boomerangWidth;
var boomerangHeight;

var boomerangStartX = -100;
var boomerangStartY = -100;

var boomerangSpeedX = 0;
var boomerangSpeedY = 0;

var impX = 100;
var impY = 100;

var impWidth;
var impHeight;

var impSpeedX = 0;
var impSpeedY = 0;

window.onload = function() { // when the page loads
	// define the canvas to the webpage
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// key events are handled
	window.addEventListener('keydown', keyInput, false);

	// run 30 frames per second
	var framesPerSecond = 60;
	setInterval(updateAll, 1000/framesPerSecond);
}

function keyInput(event) { // key events to control the direction of the snake
	// alert(event.keyCode);

	// code holds the number to map to a direction, using arrow-keys
	var code = event.keyCode;

	// make sure that the movement does not cause the snake to move into itself
	if (code == 74) { // left
		xPos -= speed;
	} else if (code == 73) { // up
		yPos-= speed;
	} else if (code == 76) { // right
		xPos += speed;
	} else if (code == 75) { // down
		yPos += speed;
	} else if (code == 65) { // a
		if (player == "kid") {
			if (boomerangX == -100) {
				boomerangX = xPos;
				boomerangY = yPos;
				boomerangStartX = xPos;
				boomerangStartY = yPos;
				boomerangSpeedX = -20;
				boomerangSpeedY = 0;
			}
		}
	} else if (code == 87) { // w
		if (player == "kid") {
			if (boomerangX == -100) {
				boomerangX = xPos;
				boomerangY = yPos;
				boomerangStartX = xPos;
				boomerangStartY = yPos;
				boomerangSpeedX = 0;
				boomerangSpeedY = -20;
			}
		}
	} else if (code == 68) { // d
		if (player == "kid") {
			if (boomerangX == -100) {
				boomerangX = xPos;
				boomerangY = yPos;
				boomerangStartX = xPos;
				boomerangStartY = yPos;
				boomerangSpeedX = 20;
				boomerangSpeedY = 0;
			}
		}
	} else if (code == 83) { // s
		if (player == "kid") {
			if (boomerangX == -100) {
				boomerangX = xPos;
				boomerangY = yPos;
				boomerangStartX = xPos;
				boomerangStartY = yPos;
				boomerangSpeedX = 0;
				boomerangSpeedY = 20;
			}
		}
	} else if (code == 49) {
		player = "kid";
		speed = 10;
	} else if (code == 50) {
		player = "warrior";
		speed = 12;
	} else if (code == 51) {
		player = "wizard";
		speed = 7;
	}
}

function updateAll() { // call this with every frame
	// move and draw everything over the current canvas
	keepLegal();
	moveAll();
	drawAll();
}

function keepLegal() { // ensure that the current position of the player is still legal
	if (xPos < edge) {
		xPos = edge;
	}

	if (yPos < edge) {
		yPos = edge;
	}

	if (xPos + playerwidth > canvas.width - edge) {
		xPos = canvas.width - edge - playerwidth;
	}

	if (yPos + playerheight > canvas.height - edge) {
		yPos = canvas.height - edge - playerheight;
	}

	if (impX < edge) {
		impX = edge;
	}

	if (impY < edge) {
		impY = edge;
	}

	if (impX + impWidth > canvas.width - edge) {
		impX = canvas.width - edge - impWidth;
	}

	if (impY + impHeight > canvas.height - edge) {
		impY = canvas.height - edge - impHeight;
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

	// impSpeedX = 10;
	// impSpeedY = 0;

	if (impX >= 1300 && impY == 100) {
		impSpeedX = 0;
		impSpeedY = 10;
		impX = 1300;
	} else if (impY >= 600 && impX == 1300) {
		impSpeedX = -10;
		impSpeedY = 0;
		impY = 600;
	} else if (impX <= 100 && impY == 600) {
		impSpeedX = 0;
		impSpeedY = -10;
		impX = 100;
	} else if (impY <= 100 && impX == 100) {
		impSpeedX = 10;
		impSpeedY = 0;
		impY = 100;
	}

	impX += impSpeedX;
	impY += impSpeedY;
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
	// canvasContext.drawImage(kid, xPos, yPos);

	warrior = new Image();
	warrior.src = 'images/warrior.png'
	// canvasContext.drawImage(warrior, edge * 6, edge * 6);

	wizard = new Image();
	wizard.src = 'images/wizard.png';
	// canvasContext.drawImage(wizard, edge * 5, edge * 5);

	imp = new Image();
	imp.src = 'images/imp.gif'
	// canvasContext.drawImage(imp, edge * 2, edge * 2);

	impWidth = imp.naturalHeight;
	impHeight = imp.naturalHeight;

	canvasContext.drawImage(imp, impX, impY);

	canvasContext.drawImage(kid, 0, edge);
	canvasContext.drawImage(warrior, 0, edge + kid.naturalHeight + 5);
	canvasContext.drawImage(wizard, 0, edge + kid.naturalHeight + 5 + warrior.naturalHeight + 5);

	if (player == "kid") {
		canvasContext.drawImage(kid, xPos, yPos);

		playerwidth = kid.naturalWidth;
		playerheight = kid.naturalHeight;
	} else if (player == "warrior") {
		canvasContext.drawImage(warrior, xPos, yPos);

		playerwidth = warrior.naturalWidth;
		playerheight = warrior.naturalHeight;
	} else if (player == "wizard") {
		canvasContext.drawImage(wizard, xPos, yPos);

		playerwidth = wizard.naturalWidth;
		playerheight = wizard.naturalHeight;
	}

	boomerang = new Image();
	boomerang.src = 'images/boomerang.png';
	canvasContext.drawImage(boomerang, boomerangX, boomerangY);

	boomerangWidth = boomerang.naturalWidth;
	boomerangHeight = boomerang.naturalHeight;
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
