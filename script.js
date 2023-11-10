// Variáveis dos botões que nos trás interações com o Bichinho
const hungerSpan = document.getElementById("hunger");
const happinessSpan = document.getElementById("happiness");
const feedButton = document.getElementById("feed");
const petButton = document.getElementById("pet");
const walkButton = document.getElementById("walk");
const emoji = document.getElementById("emoji");

// Variáveis da tela do Game Over
const gameOverScreen = document.getElementById("game-over");
const playAgainButton = document.getElementById("play-again");

// Variáveis da Fome e Felicidade do Bichinho
let hunger = 50;
let happiness = 50;

// Função de Atualização do Status de Fome e Felicidade
function updateStatus() {
    hungerSpan.textContent = hunger;

    if (happiness >= 100) { // Felicidade não pode ser maior que 100
        happiness = 100;
    }

    if (hunger >= 100) { // Fome não pode ser maior que 100
        hunger = 100;
        showGameOverScreen();
    }
    
    if (happiness <= 0 || hunger >= 100) { // Felicidade 0 OU Fome 100 -> Bichinho morre 
        feedButton.disabled = true;
        petButton.disabled = true;
        walkButton.disabled = true;
        showGameOverScreen(); // Chamando a Função que Mostra Tela de Game Over caso o Bichinho morra
    }
    
    if (hunger >= 100 && happiness <= 0) { // Fome 100 E Felicidade 0 -> Bichinho morre
        feedButton.disabled = true;
        petButton.disabled = true;
        walkButton.disabled = true;
        showGameOverScreen(); // Chamando a Função que Mostra Tela de Game Over caso o Bichinho morra
    }
    
    happinessSpan.textContent = happiness;
}

// Função que Atualiza Emoji do Bichinho conforme o humor/felicidade (se ele está bem, + ou - ou triste)
function updateEmoji() {
    if (happiness >= 60) {
        emoji.textContent = "😺";
    } else if (happiness >= 30) {
        emoji.textContent = "🐱";
    } else {
        emoji.textContent = "😿";
    }
}

// Função que mostra tela de Game Over
function showGameOverScreen() {
    gameOverScreen.style.display = "block"; // Mostra Tela Game Over
    document.getElementById("game-container").style.display = "none"; // Esconde Tela Jogo
}

// Função para Reiniciar o Jogo
playAgainButton.addEventListener("click", () => {
    hunger = 50;
    happiness = 50;
    emoji.textContent = "😺";
    feedButton.disabled = false;
    petButton.disabled = false;
    walkButton.disabled = false;
    gameOverScreen.style.display = "none"; // Esconde Tela Game Over
    document.getElementById("game-container").style.display = "block"; // Mostra tela Jogo
    updateStatus();
});

// Determina que a cada 20 segundos do Jogo o Bichinho ganha 5 de Fome e perde 5 de Felicidade
setInterval(() => {
    hunger += 5;
    happiness -= 5;
    updateStatus();
    updateEmoji();
}, 20000);

// Função do botão de Alimentar (quando alimentado, perde 10 de Fome e ganha 5 de Felicidade)
feedButton.addEventListener("click", () => {
    if (hunger >= 10) {
        hunger -= 10;
        happiness -= 5;
        updateStatus();
        updateEmoji();
    }
});

// Função do botão de Carinho (quando acariciado, ganha 5 de Felicidade)
petButton.addEventListener("click", () => {
    happiness += 5;
    updateStatus(); 
    updateEmoji();
});

// Função do botão de Passear (quando passeia, ganha 20 de Felicidade e ganha 10 de Fome)
walkButton.addEventListener("click", () => {
    happiness += 20;
    hunger += 10;
    updateStatus();
    updateEmoji();
});

// Chamando Função que Atualiza os Status do Jogo
updateStatus();
