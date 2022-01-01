var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

class VirtualBoard{
    #mousePos = {x:-1, y:-1} //Deve armazenar a posição do Mouse
    #highlight = {x:-1, y:-1} //Deve armazenar a posição, na grid, em que o mouse clicou. Seria bom visualizar essa posição com um 'highlight', logo chamei de highlight
    #selectedBuilding = null //Deve armazenar o building selecionado .
    constructor(){
        this.board = new BoardData();
        this.#initboard();
    }
    setMousePos(pos){ //Essa função deve salvar a posição do mouse na tela a cada frame.
        this.#mousePos.x = (pos.x);
        this.#mousePos.y = (pos.y);
    }
    processClick(pos){
        //Essa função deve interpretar onde na grid que um click foi feito, e chamar as funções necessárias uma vez que o click for efetuado.
        //Se o click for feito numa posição válida, as coordenadas de highlight devem ser mudadas.
        //Não fiz nada disso, logo a função está em branco.

        //TODO
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
    #write = function(val, x, y, fnt="12px Arial", fill="#222222"){  //Função privada que imprime texto no canvas
        ctx.fillStyle = fill;
        ctx.font = fnt;
        ctx.fillText(val, x, y);
    }
    draw(){
        // Desenha elementos a cada frame. Podem ser usadas qualquer uma das funções privadas que especifiquei

        //TODO: praticamente tudo. Não sei o quão útil pode ser, mas achei isso aqui: https://stackoverflow.com/questions/53310138/creating-a-draggable-and-scaleable-grid-in-html5
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

canvas.addEventListener('mousemove', function(evt){ //Eventlistener que chama setMousePos
    var pos = getMousePos(canvas, evt)
    gameBoard.setMousePos(pos);
    }, false);

canvas.addEventListener('click', function(evt){ //Eventlistener que chama processClick
    var pos = getMousePos(canvas, evt)
    gameBoard.processClick(pos);
    }, false);

function draw(){
    //Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Desenha o board do joguinho
    gameBoard.draw();
}
setInterval(draw, 10)


