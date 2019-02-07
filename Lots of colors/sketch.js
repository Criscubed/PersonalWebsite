//These variables keep track of the current RGB value being used
var red = 0;
var blue = 0;
var green = 0;

var color = 0; //color variable keeps track of which color is the dominant color
var toggle = 0; //toggle is used when a dominant color change has been triggered
var strokeToggle = 0; //strokeToggle keeps track of whether or not the circles are drawn with or without a stroke
var circleSize; //circleSize keeps track of what the size of the current circle should be
var tendrils = []; //The tendril array keeps track of tendrils need to be drawn

var circlesPerFrame = 5;
var tendrilsPerMonster = 10; //yeah
var tendrilLength = 20; //yeah

//it sets things up
function setup() {
  createCanvas(windowWidth, windowHeight);
  circleSize = windowWidth / 20;
  noStroke();
  red = random(0, 255);
  green = random(0, 255);
  blue = random(0, 255);
}

//Draw is called once per frame
function draw() {
  drawCircles();
  drawMonsters();
}

//each frame draws a number of circles with their own unique color and position
function drawCircles() {
  for (let i = 0; i < circlesPerFrame; i++) {
    circleColor();
    circlePos();
  }
}

//if there are any tendrils that need to be drawn,
//take a tendril off the stack and draw one frame of its growing animation
//if it still needs to grow, push it back onto the stack.
function drawMonsters() {
  if (tendrils.length > 1) {
    for (let i = 0; i < tendrils.length; i++) {
      var tendril = tendrils.shift();
      tendril.draw();
      if (tendril.i > 0) {
        tendrils.push(tendril);
      }
    }
  }
}

//circlePos determines the position a circle will be placed in with respect to the dominant RGB color
function circlePos() {
  var color;
  switch (toggle) {
    case 0:
      color = blue;
      break;
    case 1:
      color = red;
      break;
    case 2:
      color = green;
      break;
  }
  var xCoord = map(color, 0, 255, 0, windowWidth);
  var yCoord = random(0, windowHeight);
  ellipse(xCoord, yCoord, circleSize, circleSize);
}

//circleColor chooses a random color 
//with a number of restrictions of how different the new color can be to the previous color
function circleColor() {
  red = restrict(red + (random(50) * (round(random()) * 2 - 1)), 0, 255);
  green = restrict(green + (random(50) * (round(random()) * 2 - 1)), 0, 255);
  blue = restrict(blue + (random(50) * (round(random()) * 2 - 1)), 0, 255);
  fill(red, green, blue);
}

//restrict makes sure to keep the randomness within range of 0 and 255
function restrict(x) {
  if (x > 255) {
    return random(205, 255);
  } else if (x < 0) {
    return random(0, 50);
  } else return x;
}

//A tendril object 
function Tendril() {
  //when created, a tentril object will appear where the mouse pointer is.
  this.x = mouseX;
  this.y = mouseY;
  this.i = tendrilLength;
  //a tendril will choose whar direction it will grow in
  this.dirX = round(random()) * 2 - 1;
  this.dirY = round(random()) * 2 - 1;
  //when asked to be drawn, the tendril will draw one frame of its growth animation
  //and it will calculate where the next frame will be drawn
  this.draw = function() {
    tendrilColors(this.x);
    ellipse(this.x, this.y, circleSize, circleSize);
    this.x = this.x + random(circleSize / 4, circleSize / 4 * 3) * this.dirX;
    this.y = this.y + random(circleSize / 4, circleSize / 4 * 3) * this.dirY;
    this.i--;
    this.dirX = changeSign(this.dirX);
    this.dirY = changeSign(this.dirY);
  }
}

//calculate the color a tendril will take based on its position on the x axis
function tendrilColors(x) {
  switch (toggle) {
    case 1:
      fill(map(x, 0, windowWidth, 0, 255), random(0, 255), random(0, 255));
      break;
    case 2:
      fill(random(0, 255), map(x, 0, windowWidth, 0, 255), random(0, 255));
      break;
    case 0:
      fill(random(0, 255), random(0, 255), map(x, 0, windowWidth, 0, 255));
      break;
  }
}

//tendrils have a 90% chance to keep growing in the same direction as the current frame
function changeSign(num) {
  if (random() > 0.9) {
    return num * -1;
  } else {
    return num;
  }
}

//when the mouse is pressed,
//a toggle keeps track of what the dominant color needs to be changed to
//also, a new monster with a number of tendrils is born under the pointer
function mousePressed() {
  toggle++;
  toggle = toggle % 3;
  for (var i = 0; i < tendrilsPerMonster; i++) {
    tendrils.push(new Tendril());
  }
}

//if any key on the keyboard is pressed, a stroke will be drawn around the circles
//left arrow and right arrow will change the size of the circles
//up arrow and down arrow will change the dominant colors
function keyPressed() {
  if (keyCode == 32) {
    if (strokeToggle) {
      stroke(0);
    } else {
      noStroke();
    }
    strokeToggle = !strokeToggle;
  }
  if (keyCode == LEFT_ARROW) {
    circleSize = circleSize - 10;
  }
  if (keyCode == RIGHT_ARROW) {
    circleSize = circleSize + 10;
  }
  if (keyCode == UP_ARROW) {
    toggle++;
    toggle = toggle % 3;
  }
  if (keyCode == DOWN_ARROW) {
    toggle++;
    toggle = toggle % 3;
  }
}

//things happen when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circleSize = windowWidth / 13;
}