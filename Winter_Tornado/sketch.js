var circleSize = 0;
var circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleSize = windowWidth/20;
  colorMode(HSL);
  for(let i = 0; i < 20; i++){
   circles.push(new Circo());
  }
}

function draw() {
  clear();
  fill(0, 100, 50);
  for(let i = 0; i < circles.length; i++){
    circles[i].update();
  }
}

function Circo(){
  this.x = random(0, windowWidth);
  this.y = 0;
  this.ya = random(1, 5);
  this.theta = map(this.x, 0, windowWidth, 0, 360);
  this.update = function(){
    this.x = map(sin(this.theta), -1, 1, windowWidth/4, windowWidth/4 * 3);
  	this.y = this.y + this.ya;
    this.theta = this.theta + 0.01;
    ellipse(this.x, this.y, circleSize, circleSize);
  }
  
}