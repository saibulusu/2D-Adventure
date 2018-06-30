// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var xPos = 0;
var yPos = 362;

var characterWidth;
var characterHeight;

var impWidth;
var impHeight;

var speed = 10;

var state = 1;

var impX = 1440;
var impY = 362;

var fire1X = -100;
var fire1Y = -100;

var fire2X = -100;
var fire2Y = -100;

var fire3X = -100;
var fire3Y = -100;

var fire4X = -100;
var fire4Y = -100;

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

  if (state == 2 || state == 3 || state == 4 || state == 7 || state == 9 || state == 10 || state == 11) {
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
	if (fire1X != -100 && fire1X < edge) {
		fire1X = -100;
		fire1Y = -100;
		state++;
	}

	if (fire2Y != -100 && fire2Y < edge) {
		fire2X = -100;
		fire2Y = -100;
	}

	if (fire3X > canvas.width - edge) {
		fire3X = -100;
		fire3Y = -100;
	}

	if (fire4Y > canvas.height - edge) {
		fire4X = -100;
		fire4Y = -100;
	}
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
    colorText("Imp: We meet again. But this time you have a team!", 470, 250, 'black');
  } else if (state == 3) {
		colorRect(400, 200, 700, 100, 'white');
		colorText("Kid: Yes, and together we will defeat you!", 470, 250, 'black');
	} else if (state == 4) {
		colorRect(400, 200, 700, 100, 'white');
		colorText("Imp: I wouldn't be too sure about that...", 470, 250, 'black');
	} else if (state == 5) {
		if (fire1X == -100) {
			fire1X = impX;
			fire1Y = impY;
		} else {
			fire1X -= 10;
		}

		if (fire2X == -100) {
			fire2X = impX;
			fire2Y = impY;
		} else {
			fire2Y -= 10;
		}

		if (fire3X == -100) {
			fire3X = impX;
			fire3Y = impY;
		} else {
			fire3X += 10;
		}

		if (fire4X == -100) {
			fire4X = impX;
			fire4Y = impY;
		} else {
			fire4Y += 10;
		}
	} else if (state == 6) {
		fire1X = -100;
		fire1Y = -100;
		fire2X = -100;
		fire2Y = -100;
		fire3X = -100;
		fire3Y = -100;
		fire4X = -100;
		fire4Y = -100;

    if (impX < canvas.width) {
      impX += 10;
    } else {
      state++;
    }
  } else if (state == 7) {
    colorRect(400, 200, 700, 100, 'white');
    colorText("Kid: No...STOP!!", 600, 250, 'black');
  } else if (state == 8) {
    xPos += 5;
    if (xPos >= canvas.width / 2) {
			state++;
    }
  } else if (state == 9) {
		colorRect(400, 200, 700, 100, 'white');
    colorText("Wizard: Wait...we can't fight him yet.", 600, 250, 'black');
	} else if (state == 10) {
		colorRect(400, 200, 700, 100, 'white');
    colorText("Kid: Then...what do you suggest we do?!", 600, 250, 'black');
	} else if (state == 11) {
		colorRect(400, 200, 700, 100, 'white');
    colorText("Warrior: Let's get new teammates", 600, 250, 'black');
	} else if (state == 12) {
		xPos += 3;
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

  warrior = new Image();
  warrior.src = 'images/warrior.png';

  wizard = new Image();
  wizard.src = 'images/wizard.png';

  characterWidth = kid.naturalWidth;
  characterHeight = kid.naturalHeight;

  canvasContext.drawImage(kid, xPos, yPos);
	canvasContext.drawImage(warrior, xPos - warrior.naturalWidth - 10, yPos);
	canvasContext.drawImage(wizard, xPos - warrior.naturalWidth - wizard.naturalWidth - 20, yPos);
	if (xPos - warrior.naturalWidth - wizard.naturalWidth - 20 > canvas.width) {
		window.open("stage4.html", "_self")
	}

	imp = new Image();
	imp.src = 'images/imp.gif'

	impWidth = imp.naturalHeight;
	impHeight = imp.naturalHeight;

	canvasContext.drawImage(imp, impX, impY);

	fire = new Image();
	fire.src = 'images/fire.png';

	canvasContext.drawImage(fire, fire1X, fire1Y);
	canvasContext.drawImage(fire, fire2X, fire2Y);
	canvasContext.drawImage(fire, fire3X, fire3Y);
	canvasContext.drawImage(fire, fire4X, fire4Y);
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
