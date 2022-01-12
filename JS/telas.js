let botaoConstrucaoEl = document.querySelector('#para-construcao');
let botaoAmigosEl = document.querySelector('#para-amigos');
let botaoPresentesEl = document.querySelector('#para-presentes');
let botoesConstruirEl = document.querySelectorAll('.botao-construir')
let botoesInfoEl = document.querySelectorAll('.botao-info');
let listasTelasEl = document.querySelectorAll('.tela');

function escondeTodasTelas(){
    for (let tela of listasTelasEl){
        if( !tela.classList.contains('hidden')){
            tela.classList.toggle('hidden');
        }
    }
}

botaoConstrucaoEl.addEventListener('click', (e) => {
    escondeTodasTelas();
    document.querySelector("#construcao").classList.toggle("hidden");
})

botaoAmigosEl.addEventListener('click', (e) => {
    escondeTodasTelas();
    document.querySelector("#amigos").classList.toggle("hidden");
})

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

