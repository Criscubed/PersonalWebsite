var circleSize = 0;
var circles = [];
var c = 0;

var numberOfCircles = 800;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleSize = windowWidth/20;
  colorMode(HSL);
  noStroke();
  let temp = [];
  for(let i = 0; i < numberOfCircles; i++){
   temp.push(new Circo());
  }
  for(let i = 0; i < 50; i++){
  	let z = new Array();
    circles.push(z);
  }
  for(let i = 0; i < temp.length; i++){
  	let index = round(map(cos(temp[i].getTheta()), -1, 1, 0, 49));
    circles[index].push(temp[i]);
    
  }
}

function draw() {
  clear();
  fill(200, 100, 50);
  for(let i = 0; i < circles.length; i++){
    for(let j = 0; j < circles[i].length; j++){
    	circles[i][j].update();  
    }
  }
  c++;
}

function Circo(){
  this.x = random(0, windowWidth);
  this.y = 0;
  this.ya = random(1, 5);
  this.xa = random(-20, windowWidth/10);
  this.theta = map(this.x, 0, windowWidth, 0, 360);
  this.update = function(){
    this.y = this.y + this.ya;
    if(this.y >= windowHeight + circleSize){
    	this.y = 0 - circleSize; 
    }
    let upperBound = this.y * ((windowWidth/2)/windowHeight) * -1 + windowWidth;
    let lowerBound = this.y * ((windowWidth/2)/windowHeight);
    upperBound+= this.xa;
    lowerBound-= this.xa;
    this.x = map(sin(this.theta), -1, 1, lowerBound, upperBound);
    if(cos(this.theta) >= 0){
    	fill(c % 360, 100, map(cos(this.theta), -1, 1, 25, 50)); 
    } else {
			fill(c % 360, 100, map(cos(this.theta), -1, 1, 25, 50));      
    }
    this.theta = this.theta + 0.01;
    ellipse(this.x, this.y, circleSize, circleSize);
  }
  this.getTheta = function(){
  	 return this.theta;
  }
  
}
