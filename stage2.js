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

var fireX = -100;
var fireY = -100;

var fireStartX;
var fireStartY;

var fireWidth;
var fireHeight;

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

var wizardX = 1440 - edge * 2;
var wizardY = 362;

var kidWidth;
var kidHeight;

var warriorWidth;
var warriorHeight;

var wizardWidth;
var wizardHeight;

var state = 0;

var kidHealth = 100;
var warriorHealth = 100;

var wizardHealth = 80;

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
		state = 1.2;
	} else if (state == 1.2) {
		state = 1.3;
	} else if (state == 1.3) {
		state = 2;
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

	wizard = new Image();
	wizard.src = 'images/wizard.png';

	wizardWidth = wizard.naturalWidth;
	wizardHeight = wizard.naturalHeight;

	sworddown = new Image();
	sworddown.src = 'images/sword/sworddown.png';

	swordleft = new Image();
	swordleft.src = 'images/sword/swordleft.png';

	swordup = new Image();
	swordup.src = 'images/sword/swordup.png';

	swordright = new Image();
	swordright.src = 'images/sword/swordright.png';

	swordleftwidth = swordleft.naturalWidth;
	swordleftheight = swordleft.naturalHeight;

	swordupwidth = swordup.naturalWidth;
	swordupheight = swordup.naturalHeight;

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
	if (kidHealth <= 0 && warriorHealth <= 0) {
		kidHealth = 0;
		var r = confirm("Game over. Play again?");
		if (r == true) {
			window.open("stage2.html", "_self")
		}
	} else if (wizardHealth <= 0) {
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
			window.open("stage3.html", "_self")
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
		if (xPos >= 500) {
			state = 1;
	  }
	  xPos += 3;
	  wizardX -= 3;
	} else if (state == 2) {
		
		//player movement
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

		// 895 362
		// 775 242
		// 655 362
		// 775 482
		// console.log(wizardX + " " + wizardY);

		if (895 >= wizardX && wizardX > 775 && 362 >= wizardY && wizardY > 242) {
			wizardX -= 2;
			wizardY -= 2;
		} else if (775 >= wizardX && wizardX > 655 && 242 <= wizardY && wizardY < 362) {
			wizardX -= 2;
			wizardY += 2;
		} else if (655 <= wizardX && wizardX < 775 && 362 <= wizardY && wizardY < 482) {
			wizardX += 2;
			wizardY += 2;
		} else if (775 <= wizardX && wizardX < 895 && 482 >= wizardY && wizardY > 362) {
			wizardX += 2;
			wizardY -= 2;
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

	fire = new Image();
	fire.src = 'images/fire.png';

	kid = new Image();
	kid.src = 'images/kid.png';

	warrior = new Image();
	warrior.src = 'images/warrior.png'

	wizard = new Image();
	wizard.src = 'images/wizard.png';

	boomerang = new Image();
	boomerang.src = 'images/boomerang.png';

	fireWidth = fire.naturalWidth;
	fireHeight = fire.naturalHeight;

  kidWidth = kid.naturalWidth;
  kidHeight = kid.naturalHeight;

  warriorWidth = warrior.naturalWidth;
  warriorHeight = warrior.naturalHeight;

	wizardWidth = wizard.naturalWidth;
	wizardHeight = wizard.naturalHeight;

	canvasContext.drawImage(kid, 0, edge);
	canvasContext.font = "10px sans-serif";
	colorText(kidHealth, 0, edge + kidHeight + 10, 'black');
	canvasContext.drawImage(warrior, 0, edge + kidHeight + 10 + 10);
	canvasContext.font = "10px sans-serif";
	colorText(warriorHealth, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10, 'black');

	if (!gameover) {
		canvasContext.drawImage(wizard, canvas.width - edge, edge);
		colorText(wizardHealth, canvas.width - edge, edge + warriorHeight + 10, 'black');
	} else {
		canvasContext.drawImage(wizard, 0, edge + kidHeight + 10 + 10 + warriorHeight + 20);
		kidHealth = 100;
		warriorHealth = 100;
		wizardHealth = 80;
		colorText(wizardHealth, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10 + wizardHeight + 20, 'black');
	}

	if (player == "kid") {
		canvasContext.drawImage(kid, xPos, yPos);

		playerWidth = kid.naturalWidth;
		playerHeight = kid.naturalHeight;
	} else if (player == "warrior") {
		canvasContext.drawImage(warrior, xPos, yPos);

		playerWidth = warrior.naturalWidth;
		playerHeight = warrior.naturalHeight;
	}

  canvasContext.drawImage(wizard, wizardX, wizardY);

	canvasContext.drawImage(fire, fireX, fireY);

	canvasContext.drawImage(boomerang, boomerangX, boomerangY);

	boomerangWidth = boomerang.naturalWidth;
	boomerangHeight = boomerang.naturalHeight;

	if (overlap(boomerangX, boomerangY, boomerangWidth + boomerangX, boomerangHeight + boomerangY,
		wizardX, wizardY, wizardX + warriorWidth, wizardY + warriorHeight)) {
			wizardHealth -= 3;
		}

	if (state == 2 && xPos < wizardX) {
		if (fireX == -100) {
			fireStartX = wizardX;
			fireStartY = wizardY;
			fireX = wizardX;
			fireY = wizardY;
		}
		if (fireX > fireStartX - 200) {
			fireX -= 40;
			if (overlap(xPos, yPos, xPos + playerWidth, yPos + playerHeight,
			fireX, fireY, fireX + fireWidth, fireY + fireHeight)) {
				if (player == "kid") {
					kidHealth -= 4;
				} else if (player == "warrior") {
					warriorHealth -= 4;
				}
			}
		} else {
			fireX = -100;
			fireY = -100;
			fireStartX = -100;
			fireStartY = -100;
		}
	} else if (state == 2 && yPos < wizardY) {
		if (fireX == -100) {
			fireStartX = wizardX;
			fireStartY = wizardY;
			fireX = wizardX;
			fireY = wizardY;
		}
		if (fireY > fireStartY - 200) {
			fireY -= 40;
			if (overlap(xPos, yPos, xPos + playerWidth, yPos + playerHeight,
			fireX, fireY, fireX + fireWidth, fireY + fireHeight)) {
				if (player == "kid") {
					kidHealth -= 4;
				} else if (player == "warrior") {
					warriorHealth -= 4;
				}
			}
		} else {
			fireX = -100;
			fireY = -100;
			fireStartX = -100;
			fireStartY = -100;
		}
	} else if (state == 2 && xPos > wizardX) {
		if (fireX == -100) {
			fireStartX = wizardX;
			fireStartY = wizardY;
			fireX = wizardX;
			fireY = wizardY;
		}
		if (fireX < fireStartX + 200) {
			fireX += 40;
			if (overlap(xPos, yPos, xPos + playerWidth, yPos + playerHeight,
			fireX, fireY, fireX + fireWidth, fireY + fireHeight)) {
				if (player == "kid") {
					kidHealth -= 4;
				} else if (player == "warrior") {
					warriorHealth -= 4;
				}
			}
		} else {
			fireX = -100;
			fireY = -100;
			fireStartX = -100;
			fireStartY = -100;
		}
	} else if (state == 2 && yPos > wizardY) {
		if (fireY == -100) {
			fireStartX = wizardX;
			fireStartY = wizardY;
			fireX = wizardX;
			fireY = wizardY;
		}
		if (fireY < fireStartY + 200) {
			fireY += 40;
			if (overlap(xPos, yPos, xPos + playerWidth, yPos + playerHeight,
			fireX, fireY, fireX + fireWidth, fireY + fireHeight)) {
				if (player == "kid") {
					kidHealth -= 4;
				} else if (player == "warrior") {
					warriorHealth -= 4;
				}
			}
		} else {
			fireX = -100;
			fireY = -100;
			fireStartX = -100;
			fireStartY = -100;
		}
	}

	if (state == 1) {
		colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText("Kid: Join us, we will defeat the Imp!!", 470, 250, 'black');
	} else if (state == 1.1) {
		colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText("Wizard: I was going to work alone to defeat him.", 470, 250, 'black');
	} else if (state == 1.2) {
		colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText("Kid: Just join us! We are stronger as a team!!", 470, 250, 'black');
	} else if (state == 1.3) {
		colorRect(400, 200, 700, 100, 'white');
		canvasContext.font = "20px Arial";
		colorText("Wizard: No.", 470, 250, 'black');
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
