document.addEventListener('keydown', jump);

let player = document.getElementById('player');
let gameContainer = document.getElementById('game-container');
let obstacles = [];
let score = 0;
let successfulJumps = 0;
let username = prompt("Enter your name:");
let isAlive;
let gameInterval;
let gravity = 2;
let fallspeed = 0;
let isJumping = false;

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
    let playerHeight = parseInt(window.getComputedStyle(player).getPropertyValue('height'));

    obstacles.forEach(function (obstacle) {
        let obstacle_x = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        let obstacleWidth = parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));
        let obstacle_y = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom')); // Ändere 'top' zu 'bottom'
        let obstacleHeight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('height'));

        
        if (
            player_x < obstacle_x + obstacleWidth && 
            player_x + playerWidth > obstacle_x &&
            player_y < obstacle_y + obstacleHeight &&
            player_y + playerHeight > obstacle_y
        ) {
            clearInterval(isAlive);
            console.log("Obstacle x:", obstacle_x,"Player x:", player_x,"Obstacle Bottom-y:", obstacle_y,"player bottom-y:", player_y);
            console.log('Collision detected!');
            alert('Game Over!');
            saveScore(username, score);

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

    if (!isJumping) {
        fallspeed += gravity;
        player_y -= fallspeed;

        if (player_y <= 0) {
            player_y = 0;
            fallspeed = 0;
        }
        player.style.bottom = player_y + 'px';
    }
}

function generateObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = '100%';
    obstacle.style.height = 70 + 'px';
    document.getElementById('game-container').appendChild(obstacle);
    obstacles.push(obstacle);
    console.log();
}

function jump(event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        fallspeed = -20;  // Startet den Sprung nach oben

        setTimeout(function() {
            isJumping = false;  // Erlaubt das Fallen nach dem Sprung
        }, 300);
    }
}

function saveScore(username, score) {
    const validScore = score !== undefined ? score : 0;
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        ws.send(JSON.stringify({
            type: 'new_score',  
            username: username,  
            score: score !== undefined ? score : 0
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'update_scores') { 
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
