var balls=[]
var mic
var s
var vid
function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
	mic = new p5.AudioIn()
	vid = createCapture(VIDEO)
	vid.size(width, height);
  vid.hide();
	mic.start()
	background(0, 0, 0);
	
	
}

function draw() {
	var vol = mic.getLevel();
  s = map(vol, 0, 0.5, 30, 230);
  background(0, 0, 0); 
  for (b of balls) {
    b.update();
  }
}

function mouseDragged(){
	balls.push(new Ball(mouseX,mouseY))
}

class Ball {
  constructor(x, y) {
    this.x = x - width / 2;
    this.y = y - height / 2;
    this.z = random(-30, 30);
    this.dx = random(9) - 4;
    this.dy = random(9) - 4;
    this.dz = random(9) - 4;
    this.c = color(random(255), random(255), random(255));
    this.size = random(60, 100);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;

    let zoomFactor = map(mouseX, 0, width, 0.5, 2); // Adjust the zoom factor based on mouseX position
    let scaledSize = this.size * zoomFactor;

    push();
    translate(this.x, this.y, this.z);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(vid);
    box(scaledSize, scaledSize, scaledSize);
    pop();
  }
}
