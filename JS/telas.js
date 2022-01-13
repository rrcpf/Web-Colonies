let botoesConstrucaoEl = document.querySelectorAll('.para-construcao');
let botoesAmigosEl = document.querySelectorAll('.para-amigos');
let botaoPresentesEl = document.querySelector('.para-presentes');
let botoesConstruirEl = document.querySelectorAll('.botao-construir')
let botoesInfoEl = document.querySelectorAll('.botao-info');
let botoesVisitarEl = document.querySelectorAll('.botao-visitar');
let botaoVisitarVoltarEl = document.querySelector('.visitar-voltar');
let botaoAdicionarEl = document.querySelector('.para-adicionar');
let botoesVoltarEl = document.querySelectorAll('.botao-voltar,.botao-cancelar,.botao-confirmar');
let listasTelasEl = document.querySelectorAll('.tela');

function escondeTodasTelas(){
    for (let tela of listasTelasEl){
        if( !tela.classList.contains('hidden')){
            tela.classList.toggle('hidden');
        }
    }
}

botoesConstrucaoEl.forEach(botao => {
    botao.addEventListener('click', () => {
        escondeTodasTelas();
        document.querySelector("#construcao").classList.toggle("hidden");
    });
});

botoesAmigosEl.forEach(botao => {
    botao.addEventListener('click', () => {
        escondeTodasTelas();
        document.querySelector("#amigos").classList.toggle("hidden");
    });
});

botaoPresentesEl.addEventListener('click', (e) => {
    escondeTodasTelas();
    document.querySelector("#presentes").classList.toggle("hidden");
})

botoesConstruirEl.forEach(botao => {
    botao.addEventListener('click', () => {
        escondeTodasTelas();
        document.querySelector("#construir").classList.toggle("hidden");
    });
});

botoesInfoEl.forEach(botao => {
    botao.addEventListener('click', () => {
        escondeTodasTelas();
        document.querySelector("#info").classList.toggle("hidden");
    });
});

botoesVisitarEl.forEach(botao => {
    botao.addEventListener('click', () => {
        escondeTodasTelas();
        document.querySelector("#visitar-cidade").classList.toggle("hidden");
    });
});


botaoVisitarVoltarEl.addEventListener('click', (e) => {
    escondeTodasTelas();
    document.querySelector("#amigos").classList.toggle("hidden");
})

botaoAdicionarEl.addEventListener('click', (e) => {
    escondeTodasTelas();
    document.querySelector("#adicionar").classList.toggle("hidden");
})

botoesVoltarEl.forEach(botao => {
    botao.addEventListener('click', () => {
        escondeTodasTelas();
        if(botao.classList.contains("para-main")){
            document.querySelector("#main").classList.toggle("hidden");
        } else if(botao.classList.contains("para-construcao")){
            document.querySelector("#construcao").classList.toggle("hidden");
        } else if(botao.classList.contains("para-amigos")){
            document.querySelector("#amigos").classList.toggle("hidden");
        }
    });
});