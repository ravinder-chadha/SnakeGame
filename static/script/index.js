// Game Constants

let inputDir = { x: 0, y: 0 };
const foodSound = document.getElementById('audio3');
const gameOverSound = document.getElementById('audio4');
const moveSound = document.getElementById('audio2');
const musicSound = document.getElementById('audio1');
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }] 
// snake position
musicSound.play();
musicSound.volume = 0.2;

food = { x: 6, y: 8 };
// food location

let Score=document.getElementById('score');

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
var s=document.querySelector(".speaker");
function speak() {
    if(s.classList.contains("mute")){
        s.classList.toggle("mute");
        musicSound.play();
        // console.log("played");
    }
    else if(s.classList.contains("speaker")){
        s.classList.add("mute")
        musicSound.pause();
        // console.log("paused");
    }
    // console.log(s);
}

function gameEngine() {
    // Part 1: upadating snake variable and food.
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over.Press any key to continue");
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
        Score.innerHTML="Score: "+score;
    }
    // if food eaten increement score and change dir of food

    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            Highscore.innerHTML="Highscore: "+ highscoreval;
        }
        Score.innerHTML="Score: "+score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    
    // Part 2: Display the snake and food.
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {

            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Displaying food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}


// main logic starts here
let highScore=localStorage.getItem('highscore');
if(highScore==null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(localStorage.getItem("highscore"))
    Highscore.innerHTML="Highscore: "+ highscoreval;
}
// using local storage for high score



// gameframes
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    //  start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":

            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case "ArrowDown":

            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":

            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":

            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});