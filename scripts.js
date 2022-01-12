let canvas = document.getElementById('square');
canvas.width = 800;
canvas.height = 800;
const mouse ={
    x:canvas.width,
    y:canvas.height,
    click:false
}

const level={
    difficulty:0,
    total:0
}

let step_out;
let rnd_out;
let n_out;
let ctx_out
function draw_sq(difficulty)
{
    if(difficulty > 4)
    {
        difficulty = 4;
        level.difficulty = difficulty;
    }
    let ctx = canvas.getContext('2d');
    let n = Math.pow(2,difficulty)*Math.pow(2,difficulty);
    let rnd = getRandomIntInclusive(0,n-1);
    let step = canvas.height/Math.sqrt(n);
    step_out = step;
    rnd_out = rnd;
    n_out = n;
    ctx_out = ctx;

    let x;
    let y;

    for (let i = 0; i < n; i++) 
    {
        y = (Math.floor(i/Math.sqrt(n)))*step;
        x = (i%Math.sqrt(n)) * step;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+step, y); 
        ctx.lineTo(x+step,y+step); 
        ctx.lineTo(x, y+step); 
        ctx.lineTo(x,y);
        ctx.closePath(); 

        if (i == rnd)
        {
            ctx.fillStyle = '#1a2edb'; // тёмно-синий цвет
        }
        else
        {
            ctx.fillStyle = '#333e3b';
        }

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
}

function getRandomIntInclusive(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function upd_info() {
    document.getElementById("info").innerHTML = 'Уровень: ' + level.difficulty.toString() + ' (Всего: ' + level.total.toString() + ')';
}

function clearR() {
    ctx_out.clearRect(0,0,canvas.width,canvas.height);
}

let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener('mousedown',function (event){
    mouse.x = event.x-canvasPosition.left;
    mouse.y = event.y-canvasPosition.top;
    console.log(rnd_out);
    console.log(( Math.sqrt(n_out)*Math.floor(mouse.y/step_out) + Math.floor(mouse.x / step_out) ));
    if (( 
            Math.sqrt(n_out)
            *
            Math.floor(mouse.y/step_out)
            + 
            Math.floor(mouse.x / step_out) ) == rnd_out) 
    {
        level.total++;
        level.difficulty++
        upd_info();
        clearR();
        draw_sq(level.difficulty);   
    }  
});



level.difficulty++;
upd_info();
draw_sq(level.difficulty);

let timer; // пока пустая переменная
let x = 51-(level.difficulty*6); // стартовое значение обратного отсчета
countdown(); // вызов функции
function countdown(){  // функция обратного отсчета
  document.getElementById('timer').innerHTML = x + ' секунд.';
  x--; // уменьшаем число на единицу
  if (x<0){
    clearTimeout(timer); // таймер остановится на нуле
    clearR();
    document.getElementById("info").innerHTML += ' Проиграл!';
  }
  else {
    timer = setTimeout(countdown, 1000);
  }
}