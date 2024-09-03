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
    let player_y = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    let player_x = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    let playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue('width'));
    playerWidth = playerWidth / 2

    obstacles.forEach(function (obstacle) {
        let obstacle_x = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));
        let obstacle_y = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

        console.log("Player x:", player_x);
        console.log("player bottom-y:", player_y);
        console.log("Player Width:", playerWidth);

        console.log("Obstacle x:", obstacle_x);
        console.log("Obstacle Top-y:", obstacle_y);
        console.log("Obstacle Width:", obstacleWidth);

        if ((obstacle_x < (player_x + playerWidth)) && (obstacle_y - 212 > player_y)) {
            clearInterval(isAlive);
            console.log("Obstacle x:", obstacle_x,"Player x:", player_x,"Obstacle Top-y:", obstacle_y,"player bottom-y:", player_y)
            console.log('Collision detected!');
            alert('Game Over!');
            saveScore(score);

            if (confirm("Willst du es nochmal versuchen?")) {
                startGame();
            }
        } else if (obstacle_x < 50 && !obstacle.counted) {
            successfulJumps++;
            obstacle.counted = true;
            document.getElementById('jump-counter').innerText = `Erfolgreiche Sprünge: ${successfulJumps}`;
        } else {
            obstacle.style.left = (obstacle_x - 4) + 'px';
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
    // obstacle.style.height = (Math.random() * 50) + 20 + 'px';
    obstacle.style.height = 70 + 'px';
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