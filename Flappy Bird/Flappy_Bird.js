let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
let rows = 10;
let cols = 10;
let moduslist = ["Easy","Normal","Heavy"];
let bar = [{x:cols - space, y:1}]
var birdX = 1;
var birdY = 5;
var barSpace = Math.floor(Math.random() * 3);
var barHight = Math.floor(Math.random() * 7);
var space = Math.floor(Math.random() * 3);
let loopRunning = false;
let gameEnd = false;
let mx = 0;
let modus = moduslist[mx];
let farbindex = 0;
let scoreplus = 0;
let score = 0;
let revives = 0;
let speed = 1;
let speedplus = 50;
let interval = 200;
let interval2 = 200;
let celWidth = canvas.width / cols;
let celHeight = canvas.height / rows;
///////////////////////////////////////////////////////////////////////////////////////////////////////
snakeInterval = setInterval(gameLoop, interval);
setInterval(keyDown, 1);
loopRunning = true;
///////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('keydown', keyDown);
function keyDown(e){
    if(e.keyCode == 13) //enter/restart
    {   
        if(loopRunning == false)
        {
            gameEnd = true;
        }
        if(gameEnd == true)
        {
            
        }
    }
    if(e.keyCode == 32) //space
    {   
        birdY = birdY +1;
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
draw();
function draw() {
    ctx.fillStyle = "rgba(0, 0, 50, 0.01)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = "rgba(0, 0, 50, 0.01)";
    ctx2.fillRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = farbe[farbindex + 5];
    ctx2.font = "25px Arial";
    ctx2.fillText("Score:"+score,2, 20);
    ctx2.fillText("Revives:"+revives,2,50);
    ctx2.fillText("Speed:"+speed,2, 80);
    ctx2.fillText("Modus:"+modus,2, 110);
    drawBird(birdX,birdY);
    for(let i = 0; i < bar.length; i++){
        drawBar(bar[i].x,bar[i].y);
        }
    if(loopRunning == false)
    {
        drawDead();
    }
    for(let anzCols = 1; anzCols < cols; anzCols++)
    {
        drawGridx(anzCols);
    }
    for(let anzRows = 1; anzRows < rows; anzRows++)
    {
        drawGridy(anzRows);
    }
    requestAnimationFrame(draw);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function drawBird(x,y) {
    //Zeichnen einer Bird
    ctx.fillStyle = farbe[farbindex];
    ctx.fillRect(x*celWidth, y*celHeight, celWidth, celHeight);
}
function drawBar(x,y) {
    //Zeichnen Säule
    ctx.fillStyle = "rgba(2, 122, 2, 1)";
    ctx.fillRect(x*celWidth, y*celHeight, celWidth, celHeight);
}
function drawDead(){
    //Zeichnen wenn Tod
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(rows/10*celWidth, cols/5*celHeight, rows/1.25*celWidth, cols/1.6*celHeight);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Game Over!", canvas.width/5.5, canvas.height/2)
    ctx.font = "20px Arial";
    ctx.fillText("Press 'Return' to restart", canvas.width/4, canvas.height/1.75)
    if(modus != moduslist[2])
    {
        ctx.font = "20px Arial";
        ctx.fillText("Press 'Space' to revive", canvas.width/4, canvas.height/1.6)
    }
}
//Zeichnen Grid
function drawGridx(x){
    ctx.fillStyle = "rgba(40, 40, 40, 0.3)";
    ctx.fillRect(x*celWidth,0,2,430);
}
function drawGridy(y){
    ctx.fillStyle = "rgba(40, 40, 40, 0.3)";
    ctx.fillRect(0,y*celHeight,430,2);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function gameLoop(){
    snakeRichtung();
    if(x < barHight)
    {
        bar.push({x});
    }           
    for(i = 0; i < snake.length - 1; i++)
    {
        if(snake[i].x == snake[snake.length - 1].x && snake[i].y == snake[snake.length - 1].y)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    if(snake[snake.length - 1].x == appleX && snake[snake.length - 1].y == appleY)
    {
        AllowedLength = AllowedLength + 1;
        score = score + 1;
        scoreplus = scoreplus + 1;
        if(scoreplus == 5)
        {
            if(modus == moduslist[1] || modus == moduslist[2])
            {
                scoreplus = 0;
                clearInterval(snakeInterval);
                speed = speed + 1;
                interval2 = interval2 - speedplus;
                snakeInterval = setInterval(gameLoop, interval2);
            }
        }
        do
        {
            appleX = Math.floor(Math.random() * cols);
            appleY = Math.floor(Math.random() * rows);
            appleInSnake = false;
            for(i = 0; i < snake.length; i++)
            {   
                if(snake.length + 1 > rows * cols)
                {
                    gameEnd = true;
                    break;
                }
                if(snake[i].x == appleX && snake[i].y == appleY)
                {
                    appleInSnake = true;
                }
            }
        }while(appleInSnake == true)
    }
}

