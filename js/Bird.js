class Bird {
    constructor(canvas) {
        this.direction = "down"
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gravity = 1;
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
}