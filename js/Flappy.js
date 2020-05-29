class Flappy {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gameStatus = "home";
        this.frameNo = 0;
        this.gravity = 1;
        this.bird = new Bird(this.canvas);
        this.pipes = [];
        this.score = 0;
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
    gameOver() {
        this.gameStatus = "over";
    }
    render() {
        if(this.gameStatus == "home") {
            this.drawHomeScreen();
        } else if (this.gameStatus == "playing") {
            this.draw();
            this.update();
            if(this.everyInterval(150)) {
                let topPipeHeight = randomNumber(100,300);
                let gap = 200;
                let bottomPipeHeight = this.canvas.height - gap - topPipeHeight;
                this.createPipe('bottom', 0, 0, 52, 200, this.canvas.width, this.canvas.height - bottomPipeHeight, 70, bottomPipeHeight);
                this.createPipe('top', 0, 0, 52, 100,0, 0, 70, topPipeHeight);
                console.log(this.pipes)
            }
        }  else if (this.gameStatus == "over") {
            let text = "Game Over";
            this.ctx.font = "32px Arial"
            this.ctx.fillStyle = "red";
            this.ctx.fillText("Game Over",this.canvas.width/2 - this.ctx.measureText(text).width/2,this.canvas.height/2);
            this.drawScore();
            return;
        }

        this.frameNo++;
        requestAnimationFrame(() => {
            this.render()
        });
    }
    draw() {
        this.drawBackground();
        this.drawPipe();
        this.drawScore();
        this.bird.draw();
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
        if (this.background.dx == -800) {
            this.background.dx += 800;
        }
    }
    drawScore() {
        let score = this.bird.score;
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`Score: ${score}`, 20, 40)
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
    createPipe(position, sx, sy, sw, sh, dx, dy, dw, dh) {
        let newPipe = {
            position: position,
            sx: sx,
            sy: sy,
            sw: sw,
            sh: sh,
            dx: dx,
            dy: dy,
            dw: dw,
            dh: dh
        };
        console.log(newPipe)
        this.pipes.push(newPipe);
    }
    drawPipe() {
        let image = new Image;
        image.src = "images/pipe-green.png";
        image.onload = () => {
            this.pipes.forEach(pipe => {
                let pipeWidth = 70;
                if(pipe.position == 'bottom') {
                    this.ctx.drawImage(image, 0, 0, 52, 200, pipe.dx-1, pipe.dy, 70, pipe.dh);
                }else{
                    this.ctx.save();
                    this.ctx.translate(this.canvas.width - 10, 0 + pipe.dh / 2);
                    this.ctx.rotate(180 * Math.PI / 180.0);
                    this.ctx.translate(-pipe.dw, -pipe.dh / 2);
                    this.ctx.drawImage(image, 0, 0, 52, 200, pipe.dx, pipe.dy, pipe.dw, pipe.dh);
                    this.ctx.restore();
                }
            });
        }
    }
    updatePipe() {
        this.pipes.forEach((pipe,index) => {
            if((pipe.dx <= 0 && pipe.position == 'bottom') || (pipe.dx >= this.canvas.width && pipe.position == 'top')) this.pipes.splice(index,1)
            this.pipes[index].dx += ( this.pipes[index].position == 'top' ? +2 : -2);

            if (this.bird.isIntersect(pipe)) this.gameOver();
            else if (this.bird.isPass()) this.score++;
            
        })
    }
    everyInterval(n) {
        if ((this.frameNo / n) % 1 == 0) { return true; }
        return false;
    }

}