const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

// Game settings
const gridSize = 20; // Size of each grid square
const tileCount = canvas.width / gridSize; // Number of tiles in each row/column

// Snake and food
let snake = [{ x: 10, y: 10 }]; // Initial snake position
let direction = { x: 0, y: 0 }; // Initial direction
let food = { x: 5, y: 5 }; // Initial food position
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Draw the snake
function drawSnake() {
    ctx.fillStyle = '#00ff00'; // Green color for the snake
    snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize));
}

// Draw the food
function drawFood() {
    ctx.fillStyle = '#ff0000'; // Red color for the food
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Update the game state
function update() {
    // Move the snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score; // Update score display
        placeFood();
    } else {
        snake.pop(); // Remove the tail
    }

    // Check for collisions (walls or itself)
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    ) {
        resetGame();
    }
}

// Place food at a random position
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// Reset the game
function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    document.getElementById('high-score').textContent = highScore;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById('score').textContent = score; // Reset score display
    placeFood();
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawSnake();
    drawFood();
    update();
    setTimeout(gameLoop, 100); // Run the loop every 100ms
}

// Handle keyboard input
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
                e.preventDefault(); // Prevent page scroll
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
                e.preventDefault(); // Prevent page scroll
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
                e.preventDefault(); // Prevent page scroll
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
                e.preventDefault(); // Prevent page scroll
            }
            break;
    }
});

// Start the game
placeFood();
gameLoop();