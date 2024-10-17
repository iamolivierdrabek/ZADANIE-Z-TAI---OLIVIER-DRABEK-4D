$(document).ready(function () {
    let isJumping = false;
    let isGameOver = false;
    let obstacles = [];

    // Funkcja do obsługi skoku ludzika
    $(document).on('keydown', function (e) {
        if (e.code === 'Space' && !isJumping && !isGameOver) { // Spacja
            jump();
        }
    });

    function jump() {
        isJumping = true;
        $('#player').animate({ bottom: '150px' }, 300, function () {
            $('#player').animate({ bottom: '0px' }, 300, function () {
                isJumping = false;
            });
        });
    }

    // Funkcja tworząca przeszkody
    function createObstacles() {
        let numberOfObstacles = 3; // Ustaw ilość przeszkód
        let gameWidth = $('#game').width();
        
        for (let i = 0; i < numberOfObstacles; i++) {
            let obstacle = $('<div class="obstacle"></div>');
            $('#game').append(obstacle);
            
            let initialPosition = gameWidth + i * 200; // Przeszkody startują z różnych pozycji
            obstacle.css({ right: initialPosition + 'px' });
            
            obstacles.push(obstacle);
        }
    }

    // Funkcja ruchu przeszkód
    function moveObstacles() {
        obstacles.forEach(function (obstacle, index) {
            function animateObstacle() {
                if (!isGameOver) {
                    obstacle.animate({ right: '550px' }, 2000 + index * 500, 'linear', function () {
                        obstacle.css({ right: '-50px' });
                        animateObstacle(); // Powtórz ruch przeszkody
                    });
                }
            }
            animateObstacle();
        });
    }

    createObstacles();
    moveObstacles();

    // Funkcja wykrywania kolizji
    function detectCollision() {
        let player = $('#player');

        let playerTop = player.offset().top;
        let playerLeft = player.offset().left;
        let playerRight = playerLeft + player.width();
        let playerBottom = playerTop + player.height();

        obstacles.forEach(function (obstacle) {
            let obstacleTop = obstacle.offset().top;
            let obstacleLeft = obstacle.offset().left;
            let obstacleRight = obstacleLeft + obstacle.width();
            let obstacleBottom = obstacleTop + obstacle.height();

            if (playerRight > obstacleLeft && playerLeft < obstacleRight && playerBottom > obstacleTop && playerTop < obstacleBottom) {
                endGame();
            }
        });
    }

    // Funkcja kończąca grę
    function endGame() {
        isGameOver = true;
        $('#player').css('background-color', 'red');
        alert('Game Over!');
        location.reload(); // Restart gry
    }

    // Sprawdzaj kolizje co 10 ms
    setInterval(detectCollision, 10);
});
