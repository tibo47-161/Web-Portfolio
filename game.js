document.addEventListener('keydown', jump);

let player = document.getElementById('player');
let gameContainer = document.getElementById('game-container');
let obstacles = [];
let score = 0;
let username = prompt("Enter your name:");
let isAlive;

function startGame() {
    score = 0;
    obstacles = [];
    gameContainer.innerHTML = ''; // Fehlerbehebung: 'innerHtml' zu 'innerHTML' geändert
    gameContainer.appendChild(player);
    
    isAlive = setInterval(gameLoop, 10);
    generateObstacle();
}

function gameLoop() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));

    obstacles.forEach(function (obstacle, index) {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

        // Kollisionserkennung
        if (obstacleLeft < 120 && obstacleLeft > 50 && playerTop >= 80) {
            clearInterval(isAlive);
            alert('Game Over, du Looser!');
            saveScore(score);

            if (confirm("Willst du es nochmal versuchen?")) {
                startGame();
            }
        } else {
            obstacle.style.left = (obstacleLeft - 6) + 'px';

            // Entfernen von Hindernissen, die außerhalb des Bildschirms sind
            if (obstacleLeft < -50) {
                obstacle.remove();
                obstacles.splice(index, 1);
                score++;
            }
        }
    });

    // Neue Hindernisse generieren
    if (Math.random() < 0.01) {
        generateObstacle();
    }
}

function generateObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = '800px'; // Hindernis außerhalb des rechten Randes positionieren
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function jump(event) {
    if (event.code === 'Space') {
        if (!player.classList.contains('jump')) {
            player.classList.add('jump');
            setTimeout(function () {
                player.classList.remove('jump');
            }, 800);
        }
    }
}

function saveScore(finalScore) {
    console.log(`Score for ${username}: ${finalScore}`);
}

startGame();
