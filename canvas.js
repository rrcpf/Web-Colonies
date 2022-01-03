var canvas = document.getElementById("board");
canvas.width = window.screen.availWidth;
canvas.height = window.screen.availHeight;
var ctx = canvas.getContext("2d");


//Informação do Mouse
const mouse = {x:-1, y:-1, button : false, wheel : 0, lastX : 0, lastY : 0, drag : false}
const gridSize = 30;  // grid size in screen pixels for adaptive and world pixels for static
const scaleRate = 1.02; // Closer to 1 slower rate of change

//Lida com eventos do mouse
function mouseEvents(e){
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;
    mouse.button = e.type === "mousedown" ? true : e.type === "mouseup" ? false : mouse.button;
    if(e.type === "wheel"){
        mouse.wheel += -e.deltaY;
        e.preventDefault();
    }
}

//Adicionados Event Listeners
["mousedown", "mouseup", "mousemove"].forEach(name => canvas.addEventListener(name,mouseEvents));
canvas.addEventListener("wheel",mouseEvents, {passive: false});

//Constantes para transformação da tela
const panZoom = {
    x : 0,
    y : 0,
    scale : 1,
    apply(){ ctx.setTransform(this.scale, 0, 0, this.scale, this.x, this.y) },
    reset(){ ctx.setTransform(1, 0, 0, 1, 0, 0);},
    scaleAt(x, y, sc) {  // x & y are screen coords, not world
        this.scale *= sc;
        this.x = x - (x - this.x) * sc;
        this.y = y - (y - this.y) * sc;
    },
    toWorld(x, y, point = {}) {   // converts from screen coords to world coords
        const inv = 1 / this.scale;
        point.x = (x - this.x) * inv;
        point.y = (y - this.y) * inv;
        return point;
    },
}

function drawGrid(){
    var scale, gridScale, size, x, y, limitedGrid = false;
    gridScale = gridScreenSize;
    size = Math.max(w, h) / panZoom.scale + gridScale * 2;
    panZoom.toWorld(0,0, topLeft);
    x = Math.floor(topLeft.x / gridScale) * gridScale;
    y = Math.floor(topLeft.y / gridScale) * gridScale;
    if (size / gridScale > gridLimit) {
        size = gridScale * gridLimit;
        limitedGrid = true;
    }
    panZoom.apply();

    //Faz as linhas da grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = c;
    ctx.beginPath();
    for (i = 0; i < size; i += gridScale) {
        ctx.moveTo(x + i, y);
        ctx.lineTo(x + i, y + size);
        ctx.moveTo(x, y + i);
        ctx.lineTo(x + size, y + i);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset the transform so the lineWidth is 1
    ctx.stroke();
    
    info.textContent = "Scale: 1px = " + (1/panZoom.scale).toFixed(4) + " world px ";
    limitedGrid && (info.textContent += " Static grid limit " + (gridLimit * gridLimit) + " cells");    
} 

class VirtualBoard{
    #highlight = {x:-1, y:-1} //Deve armazenar a posição, na grid, em que o mouse clicou. Seria bom visualizar essa posição com um 'highlight', logo chamei de highlight
    #selectedBuilding = null //Deve armazenar o building selecionado.
    #scale = 1;
    #pos = {x:0, y:0};
    constructor(){
        //this.board = new BoardData();
        this.#initboard();
    }
    processClick(pos){
        //Essa função deve interpretar onde na grid que um click foi feito, e chamar as funções necessárias uma vez que o click for efetuado.
        //Se o click for feito numa posição válida, as coordenadas de highlight devem ser mudadas.
        //Não fiz nada disso, logo a função está em branco.

        //TODO
    }
    processWheel(delta){
        //Essa função deve interpretar onde na grid que um click foi feito, e chamar as funções necessárias uma vez que o click for efetuado.
        //Se o click for feito numa posição válida, as coordenadas de highlight devem ser mudadas.
        //Não fiz nada disso, logo a função está em branco.
        let zoom = 0.0125*delta;
        if (zoom+this.#scale >= 0.25 && zoom+this.#scale <= 3){
            this.#scale+=zoom;
        }
    }
    #initboard = function(){
        //O propósito dessa função seria inicialializar a grid com alguns Buildings. Não cheguei nessa parte da lógica ainda

        //TODO
    }
    #drawRect = function(x, y, w, h, fill="#FF9999"){ //Função privada que desenha um retângulo arbitrário, com posição (x,y), dimensões (w,h), e cor (fill)
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.closePath();
    }
    #drawImage = function(id, x, y, w, h){ //Função privada que imprime uma imagem no canvas, na posição e dimensões especificadas
        let img = document.getElementById(id)
        ctx.drawImage(img, x, y, w, h)
    }
    #drawGrid = function(x, y, w, h, n, m, c="#000"){
        //Faz as linhas da grid
        ctx.lineWidth = 1;
        ctx.strokeStyle = c;
        ctx.beginPath();
        for (var i = 0; i <= n; i += 1) {
            ctx.moveTo(x + i*w, y);
            ctx.lineTo(x + i*w, y + h*m);
            ctx.moveTo(x,       y + i*h);
            ctx.lineTo(x + n*w, y + i*h);
        }
        //ctx.setTransform(1, 0, 0, 1, 0, 0); // reset the transform so the lineWidth is 1
        ctx.stroke();
    }
    #write = function(val, x, y, fnt="12px Arial", fill="#222222"){  //Função privada que imprime texto no canvas
        ctx.fillStyle = fill;
        ctx.font = fnt;
        ctx.fillText(val, x, y);
    }
    draw(){
        // Desenha elementos a cada frame. Podem ser usadas qualquer uma das funções privadas que especifiquei

        //TODO: praticamente tudo. Não sei o quão útil pode ser, mas achei isso aqui: https://stackoverflow.com/questions/53310138/creating-a-draggable-and-scaleable-grid-in-html5
        //this.#drawRect(50, 50, 100, 100, "#000000");
        this.#write(`pos: {${panZoom.x},${panZoom.y}}`, 300, 45);
        this.#write(`clk: {${mouse.x},${mouse.y}}`, 300, 60);
        this.#write(`scl: ${mouse.wheel}`, 300, 75);
        panZoom.apply()
        this.#drawGrid(500, 500, 50, 50, 3, 3);
        panZoom.reset()
    }
}
let gameBoard = new VirtualBoard();

function getMousePos(canvas, evt){ 
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
/*
canvas.addEventListener('mousemove', function(evt){ //Eventlistener que chama setMousePos
    var pos = getMousePos(canvas, evt)
    gameBoard.setMousePos(pos);
    }, false);

canvas.addEventListener('click', function(evt){ //Eventlistener que chama processClick
    var pos = getMousePos(canvas, evt)
    gameBoard.processClick(pos);
    }, false);

canvas.addEventListener('wheel', function(evt){ //Eventlistener que chama processClick
    gameBoard.processWheel(evt.deltaY);
    }, false);
*/
function draw(){
    //Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Desenha o board do joguinho
    gameBoard.draw();
}
setInterval(draw, 10)


