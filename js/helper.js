function getCursorPosition(canvas,e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return {
        x,y
    }
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max-min)) + min
}