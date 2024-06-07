let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
let rows = 20;
let cols = 20;
let nrGewinner = 0;
let endFarbe = ["rgba(0, 0, 0, 0.5)","rgba(255, 0, 0, 0.5)","rgba(0, 0, 255, 0.5)"]
let scoreBlue = 0;
let scoreRed = 0;
let winBlue = 0;
let winRed = 0;
//Snake 1
let snake1 = [{x: 1,y: 1},{x: 2,y: 1},{x: 3,y: 1}];
let x1= snake1[snake1.length - 1].x;
let y1= snake1[snake1.length - 1].y;
let AllowedLength1 = 3;
var richtung1 = 'r'
var richtungist1 = 'r'
//Snake 2
let snake2 = [{x: 1,y: rows - 2},{x: 2,y: rows - 2},{x: 3,y: rows - 2}];
let x2= snake2[snake2.length - 1].x;
let y2= snake2[snake2.length - 1].y;
let AllowedLength2 = 3;
var richtung2 = 'r'
var richtungist2 = 'r'
//Essen
let appleInSnake = false;
var appleX = Math.floor(Math.random() * cols);
var appleY = Math.floor(Math.random() * rows);
let loopRunning = false;
let gameEnd = false;
let speed = 6;
let interval = 1000 / speed;
let celWidth = canvas.width / cols;
let celHeight = canvas.height / rows;
///////////////////////////////////////////////////////////////////////////////////////////////////////
snakeInterval = setInterval(gameLoop, interval);
setInterval(keyDown, 1);
loopRunning = true;
///////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('keydown', keyDown);
function keyDown(e){
    if(e.keyCode == 87) //w/up
    {   
        if(richtungist1 != 'd')
        {
            richtung1 = 'u';
        }
    }
    if(e.keyCode == 83) //s/down
    {   
        if(richtungist1 != 'u')
        {
            richtung1 = 'd';
        }
    }
    if(e.keyCode == 68) //d/right
    {  
        if(richtungist1 != 'l')
        {
            richtung1 = 'r';
        }
    }
    if(e.keyCode == 65) //a/left
    {   
        if(richtungist1 != 'r')
        {
            richtung1 = 'l';
        }
    }
    if(e.keyCode == 38) //w/up
    {   
        if(richtungist2 != 'd')
        {
            richtung2 = 'u';
        }
    }
    if(e.keyCode == 40) //s/down
    {   
        if(richtungist2 != 'u')
        {
            richtung2 = 'd';
        }
    }
    if(e.keyCode == 39) //d/right
    {  
        if(richtungist2 != 'l')
        {
            richtung2 = 'r';
        }
    }
    if(e.keyCode == 37) //a/left
    {   
        if(richtungist2 != 'r')
        {
            richtung2 = 'l';
        }
    }
    if(e.keyCode == 13) //enter/restart
    {   
        if(loopRunning == false)
        {
            gameEnd = true;
        }
        if(gameEnd == true)
        {
            snake1.splice( 0,snake1.length+1);
            snake1 = [{x: 1,y: 1},{x: 2,y: 1},{x: 3,y: 1}];
            snake2.splice( 0,snake2.length+1);
            snake2 = [{x: 1,y: rows - 2},{x: 2,y: rows - 2},{x: 3,y: rows - 2}];
            AllowedLength1 = 3;
            AllowedLength2 = 3;
            x1= snake1[snake1.length - 1].x;
            y1= snake1[snake1.length - 1].y;
            x2= snake2[snake2.length - 1].x;
            y2= snake2[snake2.length - 1].y;
            richtung1 = 'r';
            richtung2 = 'r';
            nrGewinner = 0;
            scoreBlue = 0;
            scoreRed = 0;
            snakeInterval = setInterval(gameLoop, interval);
            loopRunning = true;
            gameEnd = false;
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function snakeRichtung(){
    if(richtung1 == 'u')
    {
        y1 = y1 - 1;
        if(y1 < 0){
            y1 = rows - 1;
        }
    }
    if(richtung1 == 'd')
    {
        y1 = y1 + 1; 
        if(y1 > rows - 1){
            y1 = 0;
        }
    }
    if(richtung1 == 'r')
    {
        x1 = x1 + 1;
        if(x1 > cols - 1){
            x1 = 0;
        }
    }
    if(richtung1 == 'l')
    {
        x1 = x1 - 1;
        if(x1 < 0){
            x1 = cols - 1;
        } 
    }
    richtungist1 = richtung1;
    if(richtung2 == 'u')
    {
        y2 = y2 - 1;
        if(y2 < 0){
            y2 = rows - 1;
        }
    }
    if(richtung2 == 'd')
    {
        y2 = y2 + 1; 
        if(y2 > rows - 1){
            y2 = 0;
        }
    }
    if(richtung2 == 'r')
    {
        x2 = x2 + 1;
        if(x2 > cols - 1){
            x2 = 0;
        }
    }
    if(richtung2 == 'l')
    {
        x2 = x2 - 1;
        if(x2 < 0){
            x2 = cols - 1;
        } 
    }
    richtungist2 = richtung2;
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
    ctx2.fillStyle = "rgba(255, 2, 2, 1)";
    ctx2.font = "25px Arial";
    ctx2.fillText("Score Red:"+scoreRed,2, 20);
    ctx2.fillText("Wins Red:"+winRed,2,50);
    ctx2.fillStyle = "rgba(2, 2, 255, 1)";
    ctx2.font = "25px Arial";
    ctx2.fillText("Score Blue:"+scoreBlue,2, 100);
    ctx2.fillText("Wins Blue:"+winBlue,2,130);
    for(let i = 0; i < snake1.length; i++){
        drawSnake1(snake1[i].x,snake1[i].y);
    }
    for(let i = 0; i < snake2.length; i++){
        drawSnake2(snake2[i].x,snake2[i].y);
    }
    drawSnakeKopf(snake1[snake1.length - 1].x,snake1[snake1.length - 1].y);
    drawSnakeKopf(snake2[snake2.length - 1].x,snake2[snake2.length - 1].y);
    drawApple(appleX,appleY);
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
function drawSnakeKopf(x,y) {
    //Zeichnen einer Snake
    ctx.fillStyle = 'white';
    ctx.fillRect(x*celWidth+celWidth/6, y*celHeight+celHeight/6, celWidth/1.5, celHeight/1.5);
    ctx.fillStyle = 'black';
    ctx.fillRect(x*celWidth+celWidth/2.5, y*celHeight+celHeight/2.5, celWidth/4, celHeight/4);
}
function drawSnake1(x,y) {
    //Zeichnen einer Snake
    ctx.fillStyle = "rgba(122, 2, 2, 1)";
    ctx.fillRect(x*celWidth, y*celHeight, celWidth, celHeight);
}
function drawSnake2(x,y) {
    //Zeichnen einer Snake
    ctx.fillStyle = "rgba(2, 2, 122, 1)";
    ctx.fillRect(x*celWidth, y*celHeight, celWidth, celHeight);
}
function drawApple(x,y) {
    //Zeichnen eines Apfels
    ctx.fillStyle = "rgba(2, 122, 2, 1)";
    ctx.fillRect(x*celWidth, y*celHeight, celWidth, celHeight);
}
function drawDead(){
    //Zeichen wenn Tod
    ctx.fillStyle = endFarbe[nrGewinner];
    ctx.fillRect(rows/10*celWidth, cols/5*celHeight, rows/1.25*celWidth, cols/1.6*celHeight);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    ctx.fillText("Game Over!", canvas.width/5.5, canvas.height/2.25)
    if(nrGewinner == 1)
    {
        ctx.font = "39px Arial";
        ctx.fillText("Red Win!", canvas.width/3.25, canvas.height/1.75)
    }
    if(nrGewinner == 2)
    {
        ctx.font = "39px Arial";
        ctx.fillText("Blue Win!", canvas.width/3.25, canvas.height/1.75)
    }
    ctx.font = "20px Arial";
    ctx.fillText("Press 'Enter' to restart", canvas.width/4, canvas.height/1.5)
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
    //Bewegen
    snakeRichtung();
    if(x1!=snake1[snake1.length - 1].x || y1!=snake1[snake1.length - 1].y){
        snake1.push({ x: x1,y: y1 });
        if(snake1.length > AllowedLength1){
        snake1.splice( 0,1 );
        }
    }
    if(x2!=snake2[snake2.length - 1].x || y2!=snake2[snake2.length - 1].y){
        snake2.push({ x: x2,y: y2 });
        if(snake2.length > AllowedLength2){
        snake2.splice( 0,1 );
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //Sterben
    if(snake2[snake2.length - 1].x == snake1[snake1.length - 1].x && snake2[snake2.length - 1].y == snake1[snake1.length - 1].y)
    {
        clearInterval(snakeInterval);
        loopRunning = false;
        nrGewinner = 0;
    }        
    for(i = 0; i < snake1.length - 1; i++)
    {
        if(snake1[i].x == snake1[snake1.length - 1].x && snake1[i].y == snake1[snake1.length - 1].y)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
            nrGewinner = 2;
        }
        if(snake1[i].x == snake2[snake2.length - 1].x && snake1[i].y == snake2[snake2.length - 1].y)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
            nrGewinner = 1;
        }
    }
    for(i = 0; i < snake2.length - 1; i++)
    {
        if(snake2[i].x == snake2[snake2.length - 1].x && snake2[i].y == snake2[snake2.length - 1].y)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
            nrGewinner = 1;
        }
        if(snake2[i].x == snake1[snake1.length - 1].x && snake2[i].y == snake1[snake1.length - 1].y)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
            nrGewinner = 2;
        }
    }
    if(nrGewinner == 1)
    {
        winRed = winRed + 1;
    }
    if(nrGewinner == 2)
    {
        winBlue = winBlue + 1;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //Fressen
    if(snake1[snake1.length - 1].x == appleX && snake1[snake1.length - 1].y == appleY)
    {
        AllowedLength1 = AllowedLength1 + 1;
        scoreRed = scoreRed + 1;
        if(scoreRed == 100)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
            nrGewinner = 1;
        }
        do
        {
            appleX = Math.floor(Math.random() * cols);
            appleY = Math.floor(Math.random() * rows);
            appleInSnake = false;
            for(i = 0; i < snake1.length; i++)
            {   
                if(snake1.length + 1 > rows * cols)
                {
                    gameEnd = true;
                    break;
                }
                if(snake1[i].x == appleX && snake1[i].y == appleY)
                {
                    appleInSnake = true;
                }
            }
        }while(appleInSnake == true)
    }
    if(snake2[snake2.length - 1].x == appleX && snake2[snake2.length - 1].y == appleY)
    {
        AllowedLength2 = AllowedLength2 + 1;
        scoreBlue = scoreBlue + 1;
        if(scoreBlue == 100)
        {
            clearInterval(snakeInterval);
            loopRunning = false;
            nrGewinner = 2;
        }
        do
        {
            appleX = Math.floor(Math.random() * cols);
            appleY = Math.floor(Math.random() * rows);
            appleInSnake = false;
            for(i = 0; i < snake2.length; i++)
            {   
                if(snake1.length + 1 > rows * cols)
                {
                    gameEnd = true;
                    break;
                }
                if(snake2[i].x == appleX && snake2[i].y == appleY)
                {
                    appleInSnake = true;
                }
            }
        }while(appleInSnake == true)
    }
}

