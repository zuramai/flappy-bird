class Flappy {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameStatus = "home";
        this.frameNo = 0;
        this.gravity = 1;
        this.bird = new Bird(this.canvas);
        this.pipes = [];
        this.background = {
            sx: 0,
            sy: 300,
            sWidth:400,
            sHeight: 200,
            dx: 0,
            dy: 0,
            dWidth: 800,
            dHeight: 600
        };
        
        this.buttonStart = {
            w: 100,
            h: 50,
            x: this.canvas.width/2 - 50,
            y: this.canvas.height/2-25 - 25
        }
    }
    start() {
        this.gameStatus = "playing";
        this.frameNo = 0;

        // Draw background
        let background = new Image();
        background.src = "./../images/bg.png";
        this.ctx.drawImage(background,0,0);

        requestAnimationFrame(() => {
            this.render();
        })

    }
    stop() {
        
    }
    pause() {

    }
    render() {
        if(this.gameStatus == "home") {
            this.drawHomeScreen();
        } else if (this.gameStatus == "playing") {
            this.draw();
            this.update();
            if(this.everyInterval(150)) {
                this.createPipe();
            }
        } 

        this.frameNo++;
        requestAnimationFrame(() => {
            this.render()
        });
    }
    draw() {
        this.drawBackground();
        // Draw bird
        this.bird.draw();
        // Draw Pipe
        this.drawPipe();
    }
    update(which="all") {
        if(which=="all") {
            this.updateBackground()
            this.updatePipe();
            this.bird.update(); 
        }
    }
    drawBackground() {
        let background = new Image();
        background.src = "images/bg.png";
        background.onload = () => {
            this.ctx.drawImage(background, this.background.sx, this.background.sy, this.background.sWidth, this.background.sHeight, this.background.dx, this.background.dy, this.background.dWidth, this.background.dHeight);
            this.ctx.drawImage(background, this.background.sx, this.background.sy, this.background.sWidth, this.background.sHeight, this.background.dx + background.width-100, this.background.dy, this.background.dWidth, this.background.dHeight);
        }
    }
    updateBackground() {
        this.background.dx--;
        if(this.background.dx == -800) {
            this.background.dx += 800;
        }
    }
    flap() {
        this.bird.gravity = -5;
        setTimeout(() => {
            this.bird.gravity = 1;
        }, 100)
    }
    drawHomeScreen() {
        // draw background image
        let background = new Image();
        background.src = "images/bg.png";
        background.onload = () => {
            this.ctx.drawImage(background, this.background.sx, this.background.sy, this.background.sWidth, this.background.sHeight, this.background.dx, this.background.dy, this.background.dWidth, this.background.dHeight);
            this.ctx.drawImage(background, this.background.sx, this.background.sy, this.background.sWidth, this.background.sHeight, this.background.dx+background.width-100, this.background.dy, this.background.dWidth, this.background.dHeight);

            // draw start button
            this.ctx.fillStyle = "#2980b9";
            this.ctx.fillRect(this.canvas.width / 2 - 50, this.canvas.height / 2 - 25, 100, 50);

            this.ctx.fillStyle = "white";
            this.ctx.font = "24px Arial";
            this.ctx.fillText("START", this.canvas.width/2-38, this.canvas.height/2+6)

        }
    }
    createPipe(position, height) {
        this.pipes.push({
            position: position,
            sx: 0,
            sy: 0,
            sw: 52,
            sh: 40,
            dx: this.canvas.width,
            dy:0,
            dw: 20,
            dh: 30
        });
        console.log('Pipe created');
    }
    drawPipe() {
        this.pipes.forEach(pipe => {
            let image = new Image;
            image.src = "images/pipe-green.png";
            image.onload = () => {
                let image = new Image;
                image.src = "images/pipe-green.png";
                image.onload = () => {
                    let pipeWidth = 70;
                    let pipeHeight = 200;

                    this.ctx.drawImage(image, 0, 0, 52, 100, pipe.dx-1, this.canvas.height - 200, 70, 200);
                    
                    this.ctx.save();
                    this.ctx.translate(pipe.dx - 10, 0 + 200 / 2);
                    this.ctx.rotate(180 * Math.PI / 180.0);
                    this.ctx.translate(-pipeWidth, -200 / 2);
                    this.ctx.drawImage(image, 0, 0, 52, 100, 0, 0, pipeWidth, 200);
                    this.ctx.restore();
                }

            }
        });
    }
    updatePipe() {
        this.pipes.forEach((pipe,index) => {
            if(pipe.dx <= 0) this.pipes.shift()
            this.pipes[index].dx += -2;
        })
    }
    everyInterval(n) {
        if ((this.frameNo / n) % 1 == 0) { return true; }
        return false;
    }

}