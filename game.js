document.addEventListener('keydown', jump);

let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');

function jump(event) {
    if (event.code === 'Space') {
        if (!player.classList.contains('jump')) {
            player.classList.add('jump');
            setTimeout(function() {
                player.classList.remove('jump');
            }, 800);
        }
    }
}

let isAlive = setInterval(function() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft < 100 && obstacleLeft > 50 && playerTop >= 150) {
        alert('Game Over!');
        location.reload();
    }
}, 10);
