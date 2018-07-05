// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var xPos = 0;
var yPos = 362;

var playerWidth;
var playerHeight;

var impWidth;
var impHeight;

var speed = 10;

var state = 1;

var impX = 1440;
var impY = 362;

var boomerangX = -100;
var boomerangY = -100;

window.onload = function() { // when the page loads
	// define the canvas to the webpage
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

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

  if (state == 2 || state == 3 || state == 7 || state == 8 || state == 10) {
    state++;
  }
}

function updateAll() { // call this with every frame
	// move and draw everything over the current canvas
	keepLegal();
  drawAll();
	moveAll();
}

function keepLegal() { // ensure that the current position of the player is still legal
	// if (xPos < edge) {
	// 	xPos = edge;
	// }
  //
	// if (yPos < edge) {
	// 	yPos = edge;
	// }
  //
	// if (xPos + playerWidth > canvas.width - edge) {
	// 	xPos = canvas.width - edge - playerWidth;
	// }
  //
	// if (yPos + playerHeight > canvas.height - edge) {
	// 	yPos = canvas.height - edge - playerHeight;
	// }
}

function moveAll() {
  if (state == 1) {
    if (xPos < 500) {
      xPos += 3;
      impX -= 3;
    } else {
      state = 2;
    }
  } else if (state == 2) {
    colorRect(400, 200, 700, 100, 'white');
    colorText("Imp: HAHAHAHA! NOBODY CAN DEFEAT ME NOW!!!", 470, 250, 'black');
  } else if (state == 3) {
    colorRect(400, 200, 700, 100, 'white');
    colorText("Kid: NO!!! I WILL DEFEAT YOU!!!", 600, 250, 'black');
  } else if (state == 4) {
    colorRect(400, 200, 700, 100, 'black');
    boomerangX = xPos;
    boomerangY = yPos;
    state = 5;
  } else if (state == 5) {
    if (boomerangX < 600 + xPos) {
      boomerangX += 10;
      impY += 4;
    } else {
      state = 6;
    }
  } else if (state == 6) {
    if (boomerangX > xPos) {
      boomerangX -= 10;
      impY -= 4;
    } else {
      boomerangX = -100;
      boomerangY = -100;
      state = 7;
    }
  } else if (state == 7) {
    colorRect(400, 200, 700, 100, 'white');
    colorText("Kid: WHAT?! HOW?!", 600, 250, 'black');
  } else if (state == 8) {
    colorRect(400, 200, 700, 100, 'white');
    colorText("Imp: I'M INVINCIBLE!!!", 600, 250, 'black');
  } else if (state == 9) {
    if (impX < canvas.width) {
      impX += 10;
    } else {
      state = 10;
    }
  } else if (state == 10) {
    colorRect(400, 200, 700, 100, 'white');
    colorText("Kid: COME BACK!!!", 600, 250, 'black');
  } else if (state == 11) {
    xPos += 10;
    if (xPos >= canvas.width) {
			window.open("stage1.html", "_self")
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

  colorRect(0, 300, canvas.width, 150, color1);
}

function drawAll() { // update the location of everything in the canvas
  drawBackGround('black', 'white');

	kid = new Image();
	kid.src = 'images/kid.png';

  playerWidth = kid.naturalWidth;
  playerHeight = kid.naturalHeight;

  canvasContext.drawImage(kid, xPos, yPos);

	imp = new Image();
	imp.src = 'images/imp.gif'

	impWidth = imp.naturalHeight;
	impHeight = imp.naturalHeight;

	canvasContext.drawImage(imp, impX, impY);

  boomerang = new Image();
  boomerang.src = 'images/boomerang.png';

  canvasContext.drawImage(boomerang, boomerangX, boomerangY);
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
  canvasContext.font = "20px Arial";
	canvasContext.fillText(showWords, textX, textY);
}
