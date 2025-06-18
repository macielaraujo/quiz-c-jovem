const quiz = [
  {
    pergunta: "Qual planeta é conhecido como 'Planeta Vermelho'?",
    opcoes: ["Terra", "Marte", "Júpiter", "Saturno"],
    resposta: "Marte",
  },
  {
    pergunta: "Quem escreveu 'Dom Casmurro'?",
    opcoes: [
      "Machado de Assis",
      "José de Alencar",
      "Monteiro Lobato",
      "Clarice Lispector",
    ],
    resposta: "Machado de Assis",
  },
  {
    pergunta: "Qual é o maior oceano do planeta?",
    opcoes: ["Atlântico", "Índico", "Ártico", "Pacífico"],
    resposta: "Pacífico",
  },
  {
    pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
    opcoes: ["1965", "1969", "1972", "1959"],
    resposta: "1969",
  },
  {
    pergunta: "Qual desses elementos químicos é um metal alcalino?",
    opcoes: ["Sódio", "Carbono", "Enxofre", "Cloro"],
    resposta: "Sódio",
  },
  {
    pergunta: "Quem pintou a obra 'Mona Lisa'?",
    opcoes: ["Leonardo da Vinci", "Michelangelo", "Picasso", "Van Gogh"],
    resposta: "Leonardo da Vinci",
  },
  {
    pergunta: "Qual é a fórmula da água?",
    opcoes: ["H2O", "CO2", "NaCl", "CH4"],
    resposta: "H2O",
  },
  {
    pergunta: "Quantos lados tem um hexágono?",
    opcoes: ["5", "6", "8", "7"],
    resposta: "6",
  },
  {
    pergunta: "Qual é a capital da Argentina?",
    opcoes: ["Buenos Aires", "Montevidéu", "Lima", "Santiago"],
    resposta: "Buenos Aires",
  },
  {
    pergunta: "O que significa a sigla HTML?",
    opcoes: [
      "Hyperlinks and Text Markup Language",
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "HyperTool Multi Language",
    ],
    resposta: "HyperText Markup Language",
  },
];

let indiceAtual = 0;
let tempo = 7;
let cronometro;
let pontos = 0;
let tempoMedio = 0.0;

function iniciarTimer() {
  tempo = 7;
  const visor = document.getElementById("timer");
  visor.innerText = tempo;

  cronometro = setInterval(() => {
    tempo--;
    visor.innerText = tempo;

    if (tempo <= 0) {
      clearInterval(cronometro);
      // alert("⏰ Tempo esgotado!");
      avancar();
    }
  }, 1000);
}

function carregarPergunta() {
  clearInterval(cronometro);
  const perguntaAtual = document.getElementById("num-pergunta-atual");
  perguntaAtual.innerText = indiceAtual + 1;
  const max = document.getElementById("total-perguntas");
  max.innerText = quiz.length;
  const questao = quiz[indiceAtual];
  document.getElementById("caixa-pergunta").innerText = questao.pergunta;

  const campoResposta = document.getElementById("respostas");
  campoResposta.innerHTML = "";

  questao.opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.innerText = opcao;
    btn.classList.add("btn-option-A");
    btn.onclick = () => {
      verificarResposta(opcao);
    };
    campoResposta.appendChild(btn);
  });
  iniciarTimer();
}

function verificarResposta(opcaoSelecionada) {
  const correta = quiz[indiceAtual].resposta;
  tempoMedio += cronometro;
  if (opcaoSelecionada === correta) {
    pontos++;
  }
  clearInterval(cronometro);
  avancar();
}

function avancar() {
  indiceAtual++;
  if (indiceAtual < quiz.length) {
    carregarPergunta();
  } else {
    mostrarResultados();
  }
}

function mostrarResultados() {
  const telaResultado = document.getElementById("resultados");
  const telaQuiz = document.getElementById("tela-quiz");
  const pontuacao = document.getElementById("pontuacao");
  const total = document.getElementById("total");
  const media = document.getElementById("tempo-medio");

  let tam = quiz.length;

  telaQuiz.style.display = "none";
  telaResultado.style.display = "block";

  total.innerText = tam;
  pontuacao.innerText = parseInt(pontos);
  media.innerText = parseFloat(tempoMedio / tam);
}

function sair() {
  window.location.href("index.html");
}
function reiniciar() {
  indiceAtual = 0;
  pontos = 0;
  tempoMedio = 0;
  window.location.href("quiz.html");
}

carregarPergunta();
