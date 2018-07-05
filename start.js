// define the canvas
var canvas;
var canvasContext;

var edge = 40;

var mouseX = 0;
var mouseY = 0;

var clickX = 0;
var clickY = 0;

window.onload = function() { // when the page loads
	// define the canvas to the webpage
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	window.addEventListener('mousemove', mousemove, false);
  window.addEventListener('mousedown', mousedown, false);

  drawAll();
}

function updateAll() {
  drawAll();
}

function mousedown(evt) {
  var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	clickX = evt.clientX - rect.left - root.scrollLeft;
	clickY = evt.clientY - rect.top - root.scrollTop;

  // colorText(mouseX + " " + mouseY, mouseX, mouseY, 'white');
  if (clickX >= canvas.width / 2 - 150 && clickX <= canvas.width / 2 - 150 + 280
  && clickY >= canvas.height / 2 - 50 && clickY <= canvas.height / 2 - 50 + 70) {
    window.open("setting.html","_self");
  }
  if (clickX >= canvas.width / 2 - 150 && clickX <= canvas.width / 2 - 150 + 280
  && clickY >= canvas.height / 2 + 70 && clickY <= canvas.height / 2 + 70 + 70) {
    window.open("tutorial.html","_self");
  }
}

// update the position of the mouse
function mousemove(evt) {
	// it should not matter whether the user has scrolled down
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

  if (mouseX >= canvas.width / 2 - 150 && mouseX <= canvas.width / 2 - 150 + 280
  && mouseY >= canvas.height / 2 - 50 && mouseY <= canvas.height / 2 - 50 + 70) {
    colorRect(canvas.width / 2 - 150, canvas.height / 2 - 50, 280, 70, 'black');
    colorText("Begin Game", canvas.width / 2 - 150, canvas.height / 2, 'white');
	colorRect(canvas.width / 2 - 150, canvas.height / 2 + 70, 280, 70, 'white');
    colorText("Tutorial", canvas.width / 2 - 95, canvas.height / 2 + 120, 'black');
  } else if (mouseX >= canvas.width / 2 - 150 && mouseX <= canvas.width / 2 - 150 + 280
  && mouseY >= canvas.height / 2 + 70 && mouseY <= canvas.height / 2 + 70 + 70) {
	  colorRect(canvas.width / 2 - 150, canvas.height / 2 - 50, 280, 70, 'white');
    colorText("Begin Game", canvas.width / 2 - 150, canvas.height / 2, 'black');
	colorRect(canvas.width / 2 - 150, canvas.height / 2 + 70, 280, 70, 'black');
    colorText("Tutorial", canvas.width / 2 - 95, canvas.height / 2 + 120, 'white');
  } else {
    colorRect(canvas.width / 2 - 150, canvas.height / 2 - 50, 280, 70, 'white');
    colorText("Begin Game", canvas.width / 2 - 150, canvas.height / 2, 'black');
	colorRect(canvas.width / 2 - 150, canvas.height / 2 + 70, 280, 70, 'white');
    colorText("Tutorial", canvas.width / 2 - 95, canvas.height / 2 + 120, 'black');
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
  colorText("Welcome to 2D Adventure!", canvas.width / 2 - 300, canvas.height / 2 - 200, 'white');
    colorRect(canvas.width / 2 - 150, canvas.height / 2 - 50, 280, 70, 'white');
  colorText("Begin Game", canvas.width / 2 - 150, canvas.height / 2, 'black');
  colorRect(canvas.width / 2 - 150, canvas.height / 2 + 70, 280, 70, 'white');
  colorText("Tutorial", canvas.width / 2 - 95, canvas.height / 2 + 120, 'black');
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
  canvasContext.font = "50px Arial";
	canvasContext.fillText(showWords, textX, textY);
}
