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

var kidWidth;
var kidHeight;

var warriorWidth;
var warriorHeight;

var wizardWidth;
var wizardHeight;

var builderWidth;
var builderHeight;

var state = 0;

var kidHealth = 100;
var warriorHealth = 100;
var wizardHealth = 80;

var builderHealth = 50;

var gameover = false;

var builderX = 1000;
var builderY = 362;

window.onload = function() {
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

function keyInput(event) {
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

  var code = event.keyCode;

  if (state == 2) {
    if (code == 65) {
      left = true;
    } else if (code == 87) {
      up = true;
    } else if (code == 68) {
      right = true;
    } else if (code == 83) {
      down = true;
    } else if (code == 49 && kidHealth > 0) {
      player = "kid";
      playerSpeed = 5;
      playerWidth = kid.naturalWidth;
      playerHeight = kid.naturalHeight;
    } else if (code == 50 && warriorHealth > 0) {
      player = "warrior";
      playerSpeed = 7;
      playerWidth = warrior.naturalWidth;
      playerHeight = warrior.naturalHeight;
    } else if (code == 51) {
      player = "wizard";
      playerSpeed = 3;
      playerWidth = wizard.naturalWidth;
    }
  }
}

function updateAll() {
  keepLegal();
  drawAll();
  moveAll();
}

function keepLegal() { // ensure that the current position of the player is still legal
	if (kidHealth <= 0 && warriorHealth <= 0 && wizardHealth <= 0) {
		kidHealth = 0;
    warriorHealth = 0;
    wizardHealth = 0;
		var r = confirm("Game over. Play again?");
		if (r == true) {
			window.open("stage2.html", "_self")
		}
	} else if (wizardHealth <= 0) { //REPLACE WITH THE REAL ENEMY LATER
		warriorHealth = 0;
		gameover = true;
		wizardX = -100;
		wizardY = -100;
		fireX = -100;
		fireY = -100;
	} else if (player == "kid" && kidHealth <= 0) {
		player = "warrior";
	} else if (player == "warrior" && warriorHealth <= 0) {
		player = "wizard";
	} else if (player == "wizard" && wizardHealth <= 0) {
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
  //player movement
  if (state == 0) {
    if (xPos <= 500) {
      xPos += 3;
    } else {
      state = 1;
    }
  } else if (state == 1) {
    canvasContext.font = "20px Arial";
    colorRect(400, 200, 700, 100, 'white');
    colorText("Builder: Please! Save me from these monsters!", 470, 250, 'black');
  } else if (state == 2) {
    if (left) { // left
      xPos -= playerSpeed;
    } else if (up) { // up
      yPos-= playerSpeed;
    } else if (right) { // right
      xPos += playerSpeed;
    } else if (down) { // down
      yPos += playerSpeed;
    }
  }
}

function drawAll() {
  drawBackGround('black', 'white');

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

  builder = new Image();
  builder.src = 'images/builder.png';

  builderWidth = builder.naturalWidth;
  builderHeight = builder.naturalHeight;

	fireWidth = fire.naturalWidth;
	fireHeight = fire.naturalHeight;

  kidWidth = kid.naturalWidth;
  kidHeight = kid.naturalHeight;

  warriorWidth = warrior.naturalWidth;
  warriorHeight = warrior.naturalHeight;

	wizardWidth = wizard.naturalWidth;
	wizardHeight = wizard.naturalHeight;

  canvasContext.drawImage(builder, builderX, builderY);

  if (player == "kid") {
    canvasContext.drawImage(kid, xPos, yPos);
  } else if (player == "warrior") {
    canvasContext.drawImage(warrior, xPos, yPos);
  } else if (player == "wizard") {
    canvasContext.drawImage(wizard, xPos, yPos);
  }

  canvasContext.drawImage(kid, 0, edge);
  canvasContext.font = "10px sans-serif";
  colorText(kidHealth, 0, edge + kidHeight + 10, 'black');
  canvasContext.drawImage(warrior, 0, edge + kidHeight + 10 + 10);
  canvasContext.font = "10px sans-serif";
  colorText(warriorHealth, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10, 'black');
  canvasContext.drawImage(wizard, 0, edge + kidHeight + 10 + 10 + warriorHeight + 20);
  colorText(wizardHealth, 0, edge + kidHeight + 10 + 10 + warriorHeight + 10 + wizardHeight + 20, 'black');

  canvasContext.drawImage(builder, 0, edge * 10);
  canvasContext.font = "10px sans-serif";
  colorText(builderHealth, 0, edge * 10 + builderHeight + 10, 'black');
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
