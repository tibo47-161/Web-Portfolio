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
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    
    obstacles.forEach(function (obstacle) {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

        if (obstacleLeft < 120 && obstacleLeft > 50 && playerTop >= 70) {
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

    if (Math.random() < 0.01) {
        generateObstacle();
    }
}

function generateObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = '100%';
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
