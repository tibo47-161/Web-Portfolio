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

        console.log("Player Left:", playerLeft);
        console.log("Player Bottom:", playerBottom);
        console.log("Player Width:", playerWidth);

        console.log("Obstacle Left:", obstacleLeft);
        console.log("Obstacle Top:", obstacleTop);
        console.log("Obstacle Width:", obstacleWidth);

        if (obstacleLeft < playerLeft + playerWidth - 38 &&
            obstacleLeft + obstacleWidth > playerLeft + 38 &&
            playerBottom >= obstacleTop + 38) {
            clearInterval(isAlive);
            console.log('Collision detected!');
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
    obstacle.style.height = (Math.random() * 50) + 20 + 'px'; 
    document.getElementById('game-container').appendChild(obstacle);
    obstacles.push(obstacle);
    console.log();
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

function saveScore(username, score) {
    const validScore = score !== undefined ? score : 0;
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        ws.send(JSON.stringify({
            type: 'new_score',  
            username: username,  // Verwende den Benutzernamen
            score: score !== undefined ? score : 0
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'update_scores') { // Ändere dies zu 'update_scores'
            updateLeaderboardUI(data.scores);
        }
    };
}

function updateLeaderboardUI(leaderboard) {
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = ''; 

    leaderboard.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `${index + 1}. ${entry.username}: ${entry.score}`;
        leaderboardContainer.appendChild(entryElement);
    });
}


startGame();