import '../public/style.css';

const canvas = document.querySelector('#draw') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

// this should be as big as the window is 
canvas.width = window.innerWidth
canvas.height = window.innerHeight

/* Setting the color of the stroke to #BADA55, the lineJoin to round, and the lineCap to round. */
ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 100;
// blend mode
ctx.globalCompositeOperation = 'multiply'

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
 /* Drawing a line from the last point to the current point. */
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
/* Destructuring the array. */
    [lastX, lastY] = [e.offsetX, e.offsetY];
    /* Incrementing the hue value by 1. */
    hue++;
    
   /* Resetting the hue to 0 when it reaches 360. */
    if (hue >= 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 500 || ctx.lineWidth <= 1) {
        // flip the direction
    direction = !direction;
    }

    /* Checking the direction of the lineWidth. If it is true, it will increment the lineWidth by 1. If
    it is false, it will decrement the lineWidth by 1. */
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

/* The above code is adding event listeners to the canvas. */
canvas.addEventListener('mousedown', (e) => {
/* Setting the lastX and lastY to the current mouse position. */
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)