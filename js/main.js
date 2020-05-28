const canvas = document.getElementById('canvas');

let game = new Flappy(canvas);
game.render();

canvas.addEventListener('mousedown', (e) => {
    let cursorPosition = getCursorPosition(canvas,e);

    if(game.gameStatus == 'home') {
        if(cursorPosition.x >= game.buttonStart.x &&
            cursorPosition.x <= game.buttonStart.x + game.buttonStart.w &&
            cursorPosition.y >= game.buttonStart.y && 
            cursorPosition.y <= game.buttonStart.y + game.buttonStart.h) {
                game.start();
            }
    } else if (game.gameStatus == 'playing') {
        game.flap();
    }
});
window.addEventListener('keydown', (e) => {
    if(e.key == " " || e.key == "w" || e.key == "ArrowUp") {
        game.flap();
    }
});