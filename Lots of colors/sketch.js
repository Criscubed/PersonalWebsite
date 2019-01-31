var red = 0;
var blue = 0;
var green = 0;

var toggle = 0;
var strokeToggle = 0;
var color = 0;
var canvasSize;
var circleSize;
var tendrils = [];

var tendrilsPerMonster = 10;
var tendrilLength = 20;

 
function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasSize = windowWidth;
  circleSize = canvasSize/20;
  noStroke();
  red = random(0, 255);
	green = random(0, 255);
  blue = random (0, 255);
}

function draw() {
	for(var i = 0; i < 5; i++){
		chooseColors();
  	changeColors();
		circlePos(color);
	}
  if(tendrils.length > 1){
    for(var i = 0; i < tendrils.length; i++){
    	var monster = tendrils.shift();
  		monster.draw();
    	if(monster.i > 0){
    		tendrils.push(monster);
    	}
    }
  }
}

function circlePos(color){
  var xCoord = map(color, 0, 255, 0, canvasSize);
	var yCoord = random(0, canvasSize);
	ellipse(xCoord, yCoord, circleSize, circleSize);
}

function chooseColors(){
	red = restrict(red + (random(50) * (round(random()) * 2 - 1)), 0, 255);
  green = restrict(green + (random(50) * (round(random()) * 2 - 1)), 0, 255);
  blue = restrict(blue + (random(50) * (round(random()) * 2 - 1)), 0, 255);
	fill(red, green, blue);  
}

function restrict (x){
	if(x > 255){
  	return random(205, 255);  
  }
  if(x < 0){
  	return random(0, 50);
  }
  return x;
}



function changeColors(){
  switch(toggle){
  		case 0:
 	  		color = red;
    		break;
 	    case 1:
 	      color = green;
 	      break;
 	    case 2:
 	      color = blue; 
 	      break;
 	 	}  
}

function Tendril(){
  this.x = mouseX;
  this.y = mouseY;
  this.i = tendrilLength;
  this.dirX = round(random()) * 2 - 1;
  this.dirY = round(random()) * 2 - 1;
  this.draw = function(){
    tendrilColors(this.x);
  	ellipse(this.x, this.y, circleSize, circleSize);
    this.x = this.x + random(circleSize/4 ,circleSize/4 * 3) * this.dirX;
 	  this.y = this.y + random(circleSize/4 ,circleSize/4 * 3) * this.dirY;
    this.i--;
    this.dirX = changeSign(this.dirX);
  	this.dirY = changeSign(this.dirY);
  }
}

function tendrilColors(x){
  switch(toggle){
    case 0:
			fill(map(x, 0, windowWidth, 0, 255), random(0,255), random(0,255));
      break;
    case 1:
      fill(random(0,255), map(x, 0, windowWidth, 0, 255), random(0,255));
      break;
    case 2:
      fill(random(0, 255), random(0, 255), map(x, 0, windowWidth, 0, 255));
      break;
	}
}
function changeSign(num){
	if(random() > 0.9){
  	return num * -1;  
  } else {
    return num;
  }
}

function mousePressed(){
	toggle++;
  toggle = toggle%3;
  for(var i = 0; i < tendrilsPerMonster; i++){
		tendrils.push(new Tendril());  
  }
}

function keyPressed(){
  if(strokeToggle){
  	stroke(0);
  } else {
    noStroke(); 
  }
  strokeToggle = !strokeToggle;
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  canvasSize = windowWidth;
  circleSize = canvasSize/13;
  print(windowWidth/windowHeight);
}