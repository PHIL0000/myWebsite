let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
let rows = 20;
let cols = 20;
let moduslist = ["Easy","Normal","Heavy"];
let snake = [{x: 1,y: 1},{x: 2,y: 1},{x: 3,y: 1}];
let farbe = ["rgba(122, 2, 2, 1)","rgba(122, 122, 2, 1)","rgba(2, 2, 122, 1)","rgba(122, 2, 122, 1)","rgba(2, 122, 122, 1)","rgba(255, 0, 0, 1)","rgba(255, 255, 0, 1)","rgba(0, 0, 255, 1)","rgba(255, 0, 255, 1)","rgba(0, 255, 255, 1)"]
let x= snake[snake.length - 1].x;
let y= snake[snake.length - 1].y;
let AllowedLength = 3;
let appleInSnake = false;
var appleX = Math.floor(Math.random() * cols);
var appleY = Math.floor(Math.random() * rows);
var richtung = 'r'
var richtungist = 'r'
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
    if(e.keyCode == 87||e.keyCode == 38) //w/up
    {   
        if(richtungist != 'd')
        {
            richtung = 'u';
        }
    }
    if(e.keyCode == 83||e.keyCode == 40) //s/down
    {   
        if(richtungist != 'u')
        {
            richtung = 'd';
        }
    }
    if(e.keyCode == 68||e.keyCode == 39) //d/right
    {  
        if(richtungist != 'l')
        {
            richtung = 'r';
        }
    }
    if(e.keyCode == 65||e.keyCode == 37) //a/left
    {   
        if(richtungist != 'r')
        {
            richtung = 'l';
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
            snake.splice( 0,snake.length+1);
            snake = [{x: 1,y: 1},{x: 2,y: 1},{x: 3,y: 1}];
            AllowedLength = 3;
            x= snake[snake.length - 1].x;
            y= snake[snake.length - 1].y;
            richtung = 'r';
            score = 0;
            speed = 0;
            revives = 0;
            farbindex = 0;
            appleX = Math.floor(Math.random() * cols);
            appleY = Math.floor(Math.random() * rows);
            snakeInterval = setInterval(gameLoop, interval);
            loopRunning = true;
            gameEnd = false;
        }
    }
    if(e.keyCode == 32) //space
    {   
        if(modus == moduslist[1]||modus == moduslist[0])
        {
            if(gameEnd == true)
            {
                snake.splice( 0,snake.length+1);
                snake = [{x: 1,y: 1},{x: 2,y: 1},{x: 3,y: 1}];
                AllowedLength = 3;
                x= snake[snake.length - 1].x;
                y= snake[snake.length - 1].y;
                richtung = 'r';
                score = 0;
                speed = 0;
                revives = 0;
                farbindex = 0;
                appleX = Math.floor(Math.random() * cols);
                appleY = Math.floor(Math.random() * rows);
                snakeInterval = setInterval(gameLoop, interval);
                loopRunning = true;
                gameEnd = false;
            }
            if(loopRunning == false)
            {   
                interval2 = interval2 + speedplus;
                snakeInterval = setInterval(gameLoop, interval2);
                loopRunning = true;
                farbindex = farbindex + 1;
                revives = revives+ 1;
                speed = 1;
                if(farbindex == farbe.length - 5)
                {
                    farbindex = 0;
                }
            }
        }
    }
    if(e.keyCode == 77)
    {   
        mx = mx + 1;
        if(mx == 3)
        {
            mx = 0;
        }
        modus = moduslist[mx];
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function snakeRichtung(){
    if(richtung == 'u')
    {
        y = y - 1;
        if(y < 0){
            y = rows - 1;
        }
    }
    if(richtung == 'd')
    {
        y = y + 1; 
        if(y > rows - 1){
            y = 0;
        }
    }
    if(richtung == 'r')
    {
        x = x + 1;
        if(x > cols - 1){
            x = 0;
        }
    }
    if(richtung == 'l')
    {
        x = x - 1;
        if(x < 0){
            x = cols - 1;
        } 
    }
    richtungist = richtung;
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
    ctx2.fillText("Mode:"+modus,2, 110);
    for(let i = 0; i < snake.length; i++){
    drawSnake(snake[i].x,snake[i].y);
    }
    drawSnakeKopf(snake[snake.length - 1].x,snake[snake.length - 1].y);
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
function drawSnake(x,y) {
    //Zeichnen einer Snake
    ctx.fillStyle = farbe[farbindex];
    ctx.fillRect(x*celWidth, y*celHeight, celWidth, celHeight);
}
function drawApple(x,y) {
    //Zeichnen eines Apfels
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
    if(x!=snake[snake.length - 1].x || y!=snake[snake.length - 1].y){
        snake.push({ x,y });
        if(snake.length > AllowedLength){
        snake.splice( 0,1 );
        }
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

