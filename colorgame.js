// Returns a random RGB color
function randomRGB() {
	var o = Math.round, r = Math.random, s = 255;
	return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

var color = randomRGB();
var currLevel = 0;
var levels = [60, 40, 25, 20, 14, 10, 5, 2]
var squares = document.querySelectorAll(".square");
var randomArr = [...Array(squares.length).keys()];

// Begin Game
reset();

// Fills squares with colors according to current level
function fillSquares(level) {
	for(var i = 0; i < squares.length; i++) {
		var rotationDegree = randomArr[i] * level;
		squares[i].setAttribute("style","background-color:" + color + "; filter: hue-rotate(" + rotationDegree + "deg);");
	}
}

// Checks which square is clicked
for(var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		var clicked = this.style.filter;
		if (clicked == "hue-rotate(0deg)") {
			currLevel++;
			nextLevel();
		}
		else {
			alert("Uh oh... Game over");
			currLevel = 0;
			reset();
		}
})};

// Randomizes placement of colors
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Move to the next level, or end game
function nextLevel() {
	console.log(currLevel);
	if (currLevel < levels.length) {
		reset();
	}
	else {
		alert("You won! Play again?");
		currLevel = 0;
		reset();
	}
}

// Resets game at each level
function reset() {
	document.querySelector("span").textContent = currLevel + 1;
	color = randomRGB();
	document.querySelector(".circle").style.backgroundColor = color;
	shuffleArray(randomArr);
	fillSquares(levels[currLevel]);
}

