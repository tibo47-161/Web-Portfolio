document.addEventListener('keydown', jump);

let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let score = 0;
let username = prompt("Enter your name:");
let isAlive;
let gameInterval;

function startGame() {
    
    score = 0;
    obstacle.style.left = '100%'; 
    
    // Start the game
    isAlive = setInterval(gameLoop, 10);
}

function gameLoop() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft < 120 && obstacleLeft > 50 && playerTop >= 80) {
        clearInterval(isAlive);
        alert('Game Over!');
        saveScore(score);
    
        if (confirm('Do you want to play again?')) {
            startGame();
        }
}   else {
        score++;
        // Move the obstacle leftward (you might need to adjust this logic based on your animation)
        obstacle.style.left = (obstacleLeft - 6) + 'px';
    }
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
    // You can implement this function to save the score, e.g., localStorage or a server call
    console.log(`Score for ${username}: ${finalScore}`);
}

// Initialize the game
startGame();
