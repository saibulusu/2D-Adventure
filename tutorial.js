// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var xPos = edge;
var yPos = 362;

var playerWidth;
var playerHeight;

var playerSpeed = 5;

var player = "kid";

var boomerangX = -100;
var boomerangY = -100;

var boomerangWidth;
var boomerangHeight;

var boomerangStartX = -100;
var boomerangStartY = -100;

var boomerangSpeedX = 0;
var boomerangSpeedY = 0;

var state = 0;

var kidHealth = 100;

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
	} else if (state == 2.1) {
		state = 2.2;
	} else if (state == 2.2) {
		state = 3;
	} else if (state == 4) {
		state = 4.1;
	} else if (state == 4.1) {
		state = 4.2;
		gameover = true;
	} else if (state == 4.2) {
		state = 5;
	}
}

var up = false;
var down = false;
var left = false;
var right = false;
document.onkeyup = keyRelease;
function keyRelease(event) {
	var code = event.keyCode;
	if (code == 65) {
		left = false;
	} else if (code == 87) {
		up = false;
	} else if (code == 68) {
		right = false;
	} else if (code == 83) {
		down = false;
	}
}

function keyInput(event) { // key events to control the direction of the snake
	// alert(event.keyCode);

  if (state == 2 || state == 3 || state == 5) {
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

  if (state == 3 || state == 5) {
		if (code == 74) { // left
			if (player == "kid") {
  			if (boomerangX == -100) {
  				boomerangX = xPos;
  				boomerangY = yPos;
  				boomerangStartX = xPos;
  				boomerangStartY = yPos;
  				boomerangSpeedX = -10;
  				boomerangSpeedY = 0;
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
  		}
  	} else if (code == 49) {
  		// player = "kid";
  		// speed = 10;
  	} else if (code == 50) {
  		// player = "warrior";
  		// speed = 12;
  	} else if (code == 51) {
  		// player = "wizard";
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
	}

	if (gameover) {
		if (xPos > canvas.width) {
			window.open("setting.html", "_self")
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
  if (state == 0) {
		if (xPos >= 200) {
			state = 1;
	  }
	  xPos += 3;
	} else if (state == 2) {
		if (xPos+playerWidth >= 800 && yPos+playerHeight >= 500 &&
			xPos <= 800+boomerangWidth && yPos+playerHeight<=500+boomerangHeight)
			state = 2.1;
		if (left) { // left
			xPos -= playerSpeed;
		} else if (up) { // up
			yPos-= playerSpeed;
		} else if (right) { // right
			xPos += playerSpeed;
		} else if (down) { // down
			yPos += playerSpeed;
		}
	} else if (state == 3 || state == 5) {
		if (left) { // left
			xPos -= playerSpeed;
		} else if (up) { // up
			yPos-= playerSpeed;
		} else if (right) { // right
			xPos += playerSpeed;
		} else if (down) { // down
			yPos += playerSpeed;
		}
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
	if (state == 3 && boomerangX+boomerangWidth >= 200 && boomerangX <= 230 &&
			boomerangY+boomerangHeight >= 400 && boomerangY <= 430) {
		boomerangX = -100;
		state = 4;
	}

		// 895 362
		// 775 242
		// 655 362
		// 775 482
		// console.log(warriorX + " " + warriorY);
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

	canvasContext.drawImage(kid, 0, edge);
	canvasContext.font = "10px sans-serif";
	colorText(kidHealth, 0, edge + playerHeight + 10, 'black');

	if (state == 1.1 || state == 2) {
		boomerang = new Image();
		boomerang.src = 'images/boomerang.png';
		canvasContext.drawImage(boomerang, 800, 500);

		boomerangWidth = boomerang.naturalWidth;
		boomerangHeight = boomerang.naturalHeight;
	} else if (state == 2.2 || state == 3) {
		target = new Image();
		target.src = 'images/target.png';
		canvasContext.drawImage(target, 200, 400, 30, 30);
	}

	if (player == "kid") {
		canvasContext.drawImage(kid, xPos, yPos);

		playerWidth = kid.naturalWidth;
		playerHeight = kid.naturalHeight;
	}

	boomerang = new Image();
	boomerang.src = 'images/boomerang.png';
	canvasContext.drawImage(boomerang, boomerangX, boomerangY);

	boomerangWidth = boomerang.naturalWidth;
	boomerangHeight = boomerang.naturalHeight;

	if (state == 1) {
		writeMessage("Kid: I am going on an adventure, but I need your help");
	} else if (state == 1.1) {
		writeMessage("Kid: Use WASD to move me over there");
	} else if (state == 2.1) {
		writeMessage("Kid: Wow a boomerang");
	} else if (state == 2.2) {
		writeMessage("Kid: Use IJKL to throw the boomerang at that thing");
	} else if (state == 4) {
		writeMessage("Kid: Well done, you've learned the basics.");
	} else if (state == 4.1) {
		writeMessage("Kid: You can see how much health I have left in the upper left corner");
	} else if (state == 4.2) {
		writeMessage("Kid: Now let's travel east to fight the imp!");
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

function writeMessage(message) {
	colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText(message, 470, 250, 'black');
}
