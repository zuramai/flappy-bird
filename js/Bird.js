class Bird {
    constructor(canvas) {
        this.direction = "down"
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gravity = 1;
        this.score = 0;
        this.bird = {
            sx: 0,
            sy: 0,
            sWidth:50,
            sHeight: 50,
            dx: 50,
            dy: this.canvas.height/2,
            dWidth: 50,
            dHeight: 50
        };
    }
    draw() {
        let image = new Image;
        image.src = "images/bird.png";
        this.ctx.drawImage(image, this.bird.sx, this.bird.sy, this.bird.sWidth, this.bird.sHeight, this.bird.dx, this.bird.dy, this.bird.dWidth, this.bird.dHeight);
    }
    update() {
        if(this.direction == 'down') {
            this.bird.dy += this.gravity;
        }
    }
    flap() {
        this.gravity = -5;
        setTimeout(() => {
            this.gravity = 1;
        }, 100)
    }
    isIntersect(pipe) {
        if (this.bird.dx >= pipe.dx &&
            this.bird.dx <= pipe.dx + pipe.dw &&
            this.bird.dy >= pipe.dy &&
            this.bird.dy <= pipe.dy + pipe.dh &&
            pipe.position == 'bottom') {
            return true;
        }else if(this.bird.dx >= this.canvas.width - pipe.dx &&
            this.bird.dx <= this.canvas.width - pipe.dx + pipe.dw &
            this.bird.dy >=  pipe.dy && 
            this.bird.dy <= pipe.dy + pipe.dh &&
            pipe.position == 'top') {
            return true;
        }
        if(this.bird.dx >= pipe.dx && pipe.position == 'bottom'){
            this.score++;
        }
    }
    isPass() {

    }
}