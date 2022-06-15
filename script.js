const ww=window.innerWidth-20;
const wh=window.innerHeight-20;
const speed=3;
const num=30;
const tail=50;
const interval=30;

class Dot {
    constructor() {
        this.o = [];
        this.x = Math.random()*ww;
        this.y = Math.random()*wh;
        this.angle = Math.random()*360*Math.PI/180;
        this.speed = speed;
        this.color = '#'+(Math.round(Math.random()*0xffffff)).toString(16);
        this.newMove();
    }
    newMove() {
        this.steps = Math.round(Math.random()*60+5);
        this.da = (Math.random()*360-180)*Math.PI/180/this.steps;    
    }
    checkBounds() {
        if(this.x<0||this.x>ww||this.y<0||this.y>wh) {
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
        let e = document.createElement('o');
        e.innerText = '>';
        e.style.transform = 'rotate('+this.angle+'rad)';
        e.style.left = this.x;
        e.style.top = this.y;
        e.style.color = this.color;
        this.o.unshift(e);
        document.body.appendChild(e);
        for(let i=0;i<this.o.length;i++)
            this.o[i].style.opacity = 1-i/this.o.length;
        if(this.o.length>tail) {
            let u = this.o.pop();
            document.body.removeChild(u);
        }
        this.steps--;
    }
}


let dots = [];
for(let i=0;i<num;i++) dots.push(new Dot());

setInterval(function(){
   for(d in dots) dots[d].step();
}, interval);
