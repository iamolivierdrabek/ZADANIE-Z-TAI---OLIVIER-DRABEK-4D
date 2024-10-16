$(document).ready(function () {
    let isJumping = false;
    let isGameOver = false;

    // Funkcja do obsługi skoku ludzika
    $(document).on('keydown', function (e) {
        if (e.key === ' ' && !isJumping && !isGameOver) { // Spacja
            jump();
        }
    });

    function jump() {
        isJumping = true;
        $('#player').animate({ bottom: '100px' }, 300, function () {
            $('#player').animate({ bottom: '0px' }, 300, function () {
                isJumping = false;
            });
        });
    }

    // Funkcja ruchu przeszkody
    function moveObstacle() {
        $('#obstacle').css({ right: '-50px' });

        function animateObstacle() {
            if (!isGameOver) {
                $('#obstacle').animate({ right: '550px' }, 2000, 'linear', function () {
                    $('#obstacle').css({ right: '-50px' });
                    animateObstacle(); // Powtórz ruch przeszkody
                });
            }
        }

        animateObstacle();
    }

    moveObstacle();

    // Funkcja wykrywania kolizji
    function detectCollision() {
        let player = $('#player');
        let obstacle = $('#obstacle');

        let playerTop = player.offset().top;
        let playerLeft = player.offset().left;
        let playerRight = playerLeft + player.width();
        let playerBottom = playerTop + player.height();

        let obstacleTop = obstacle.offset().top;
        let obstacleLeft = obstacle.offset().left;
        let obstacleRight = obstacleLeft + obstacle.width();
        let obstacleBottom = obstacleTop + obstacle.height();

        if (playerRight > obstacleLeft && playerLeft < obstacleRight && playerBottom > obstacleTop && playerTop < obstacleBottom) {
            endGame();
        }
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
