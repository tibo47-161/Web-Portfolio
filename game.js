document.addEventListener('keydown', jump);

let player = document.getElementById('player');
let gameContainer = document.getElementById('game-container');
let obstacles = [];
let score = 0;
let successfulJumps = 0;
let username = prompt("Enter your name:");
let isAlive;
let gameInterval;

function startGame() {
    score = 0;
    successfulJumps = 0;
    obstacles = [];
    document.getElementById('game-container').innerHTML = '';
    gameContainer.appendChild(player);
    document.getElementById('jump-counter').innerText = `Erfolgreiche Sprünge: 0`;

    isAlive = setInterval(gameLoop, 10);
    generateObstacle();
}

function gameLoop() {
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('height')) + parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    let playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue('width'));

    obstacles.forEach(function (obstacle) {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));
        let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('height')) + parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));

        if (obstacleLeft < playerLeft + playerWidth &&
            obstacleLeft + obstacleWidth > playerLeft &&
            playerBottom >= obstacleTop) {
            clearInterval(isAlive);
            alert('Game Over!');
            saveScore(score);

            if (confirm("Willst du es nochmal versuchen?")) {
                startGame();
            }
        } else if (obstacleLeft < 50 && !obstacle.counted) {
            successfulJumps++;
            obstacle.counted = true;
            document.getElementById('jump-counter').innerText = `Erfolgreiche Sprünge: ${successfulJumps}`;
        } else {
            obstacle.style.left = (obstacleLeft - 4) + 'px';
        }
    });

    if (Math.random() < 0.008) {
        generateObstacle();
    }
}

function generateObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = '100%';
    obstacle.style.height = (Math.random() * 50) + 20 + 'px'; // random height between 20px and 70px
    document.getElementById('game-container').appendChild(obstacle);
    obstacles.push(obstacle);
}

function jump(event) {
    if (event.code === 'Space') {
        if (!player.classList.contains('jump')) {
            player.classList.add('jump');
            setTimeout(function() {
                player.classList.remove('jump');
            }, 300);
        }
    }
}

function saveScore(finalScore) {
    console.log(`Score for ${username}: ${finalScore}`);
}

startGame();