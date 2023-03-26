// Get the canvas element and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Initialize the game variables
var snake = [{
    x: 200,
    y: 200
}, {
    x: 190,
    y: 200
}, {
    x: 180,
    y: 200
}, {
    x: 170,
    y: 200
}, {
    x: 160,
    y: 200
}];
var food = {};
var direction = "right";
var gameStarted = false;
var score = 0;

// Start a new game when the "New Game" button is clicked
function startGame() {
    gameStarted = true;
    snake = [{
        x: 200,
        y: 200
    }, {
        x: 190,
        y: 200
    }, {
        x: 180,
        y: 200
    }, {
        x: 170,
        y: 200
    }, {
        x: 160,
        y: 200
    }];
    direction = "right";
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    draw();
    generateFood();
    setInterval(move, 100);
    document.addEventListener("keydown", function (event) {
        if (event.code === "ArrowRight" && direction !== "left") {
            direction = "right";
        } else if (event.code === "ArrowLeft" && direction !== "right") {
            direction = "left";
        } else if (event.code === "ArrowUp" && direction !== "down") {
            direction = "up";
        } else if (event.code === "ArrowDown" && direction !== "up") {
            direction = "down";
        }
    });

}

// Draw the snake and the food on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    snake.forEach(function (segment) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Generate a new food at a random location on the canvas
function generateFood() {
    var x = Math.floor(Math.random() * 39) * 10;
    var y = Math.floor(Math.random() * 39) * 10;
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x == x && snake[i].y == y) {
            generateFood();
            return;
        }
    }
    food = {
        x: x,
        y: y
    };
}

// Move the snake in the current direction
function move() {
    var head = {
        x: snake[0].x,
        y: snake[0].y
    };
    switch (direction) {
        case "right":
            head.x += 10;
            break;
        case "left":
            head.x -= 10;
            break;
        case "up":
            head.y -= 10;
            break;
        case "down":
            head.y += 10;
            break;
    }
    snake.unshift(head);
    if (head.x == food.x && head.y == food.y) {
        score += 10;
        document.getElementById("score").innerHTML = "Score: " + score;
        generateFood();
    } else {
        snake.pop();
    }
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameStarted = false;
        alert("Game Over. Your Score: " + score);
    }
    for (var i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            gameStarted = false;
            alert("Game over! Your score is " + score + ". Click OK to play again.");

            startGame();

        };

    }
    draw();
}