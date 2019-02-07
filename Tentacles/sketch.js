var circleSize;
var tendrils = [];
var tendrilsPerMonster = 10;
var tendrilLength = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleSize = windowWidth/20;
  noStroke();
}

function draw() {
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

function mousePressed(){
  for(var i = 0; i < tendrilsPerMonster; i++){
		tendrils.push(new Tendril());  
  }
}

function Tendril(){
  this.x = mouseX;
  this.y = mouseY;
  this.i = tendrilLength;
  this.dirX = round(random()) * 2 - 1;
  this.dirY = round(random()) * 2 - 1;
  this.draw = function(){
    fill(random(0,255), random(0,255), map(this.x, 0, windowWidth, 0, 255));
  	ellipse(this.x, this.y, circleSize, circleSize);
    this.x = this.x + random(circleSize/4 ,circleSize/4 * 3) * this.dirX;
 	  this.y = this.y + random(circleSize/4 ,circleSize/4 * 3) * this.dirY;
    this.i--;
    this.dirX = changeSign(this.dirX);
  	this.dirY = changeSign(this.dirY);
  }
}

function changeSign(num){
	if(random() > 0.9){
  	return num * -1;  
  } else {
    return num;
  }
}