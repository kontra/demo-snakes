let {random,floor,ceil,round}=Math;
let canvas,ctx,W,H;
let dots=[];
let fontSize=10;
let intervalA;

const wh=window.innerHeight-20;
const speed=3;
const num=50;
const interval=40;

class Dot {
  constructor() {
    this.x = random()*W;
    this.y = random()*H;
    this.angle = random()*360*Math.PI/180;
    this.speed = speed;
    this.color = '#'+(round(random()*0xffffff)).toString(16);
    this.newMove();
  }
    newMove() {
        this.steps = round(random()*40+5);
        this.da = (random()*360-180)*Math.PI/180/this.steps;    
    }
    checkBounds() {
        if(this.x<0||this.x>W||this.y<0||this.y>H) {
            this.angle += 90*Math.PI/180;
            this.step();
        } else {
            this.move();
        }
    }
    step() {
        if(this.steps<0) this.newMove();
        this.angle += this.da;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.checkBounds();
    }
    move() {
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillText(">", -5, -5);
        ctx.rotate(-this.angle);
        ctx.translate(-this.x, -this.y);
        this.steps--;
    }
}


function init(){
    canvas=document.getElementById("canvas");
    canvas.width=W=window.innerWidth;
    canvas.height=H=window.innerHeight;
    ctx=canvas.getContext("2d");    
    cellSize =W/30;    
    ctx.font = `bolder ${cellSize}px monospace`;
    
  //  restart();

    for(let i=0;i<num;i++) dots.push(new Dot());
    intervalA = setInterval(function(){
      for(d in dots) dots[d].step();
      fade();
    }, interval);
}


function fade(){
    ctx.fillStyle="rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,W,H)
}


function restart(){
    clearInterval(intervalA);
    ctx.fillStyle="rgba(0,0,0,1)";
    ctx.fillRect(0,0,W,H);
    init();
}