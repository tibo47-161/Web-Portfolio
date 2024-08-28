document.addEventListener('keydown', jump);

let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let score = 0;
let username = prompt("Enter your name:");

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

let isAlive = setInterval(function() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft < 120 && obstacleLeft > 50 && playerTop >= 100) {
        clearInterval(isAlive);
        alert('Game Over!');
        saveScore(score);
    } else {
        score++;
    }
}, 10);

function saveScore(score) {
    if (username) {
        fetch('/save_score/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&score=${score}`
        }).then(response => response.json())
        .then(data => {
            alert(data.message);
            getScores();
        });
    }
}

function getScores() {
    fetch('/get_scores/')
        .then(response => response.json())
        .then(scores => {
            let scoreBoard = document.getElementById('scoreboard');
            scoreBoard.innerHTML = '<h2>Top 3 Highscores</h2>';
            scores.forEach(score => {
                scoreBoard.innerHTML += `<p>${score.username}: ${score.score}</p>`;
            });
            getUserScore();
        });
}

function getUserScore() {
    if (username) {
        fetch(`/get_score_for_user/?username=${username}`)
            .then(response => response.json())
            .then(data => {
                let currentScoreBoard = document.getElementById('current-score');
                currentScoreBoard.innerHTML = `<h3>Your Score</h3><p>${data.username}: ${data.score}</p>`;
            });
    }
}

function updateCurrentScore(score) {
    let currentScoreBoard = document.getElementById('current-score');
    currentScoreBoard.innerHTML = `<h3>Your Score</h3><p>${username}: ${score}</p>`;
}

// Initiales Abrufen der Highscores
getScores();