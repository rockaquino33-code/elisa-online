// script.js

// Seleciona elementos do DOM
const app = document.getElementById('app');

// Sons PS5
const clickSound = new Audio('assets/click.mp3');
const notificationSound = new Audio('assets/notification.mp3');

// Função para tocar som
function playSound(type) {
    if(type === 'click') clickSound.play();
    if(type === 'notification') notificationSound.play();
}

// Função de voz humana (Text-to-Speech)
function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    utter.rate = 1;
    utter.pitch = 1;
    synth.speak(utter);
}

// Exemplo de aulas interativas
const aulas = [
    {nome: 'Português', conteudo: 'Hoje vamos estudar gramática e ortografia.'},
    {nome: 'Matemática', conteudo: 'Vamos aprender sobre equações e porcentagem.'},
    {nome: 'Inglês', conteudo: 'Hoje vamos aprender vocabulário e frases úteis.'},
    {nome: 'Geografia', conteudo: 'Vamos estudar continentes e países.'},
    {nome: 'História', conteudo: 'Hoje veremos fatos históricos importantes.'},
    {nome: 'Ciências', conteudo: 'Vamos estudar o corpo humano e a natureza.'}
];

// Função para mostrar aulas no app
function mostrarAulas() {
    const ul = document.createElement('ul');
    aulas.forEach(aula => {
        const li = document.createElement('li');
        li.textContent = aula.nome;
        li.onclick = () => {
            playSound('click');
            alert(aula.conteudo);
            speak(aula.conteudo);
        }
        ul.appendChild(li);
    });
    app.appendChild(ul);
}

// Função para gerar arquivos (exemplo PDF)
function gerarPDF(nome, conteudo) {
    const blob = new Blob([conteudo], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${nome}.pdf`;
    link.click();
    playSound('notification');
}

// Função para gerar arquivos Word (docx) - simples exemplo
function gerarWord(nome, conteudo) {
    const blob = new Blob([conteudo], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${nome}.doc`;
    link.click();
    playSound('notification');
}

// Inicializa a Elisy
window.onload = () => {
    mostrarAulas();
    speak('Bem-vindo à Elisy PS5! Selecione uma aula ou gere um arquivo.');
}
