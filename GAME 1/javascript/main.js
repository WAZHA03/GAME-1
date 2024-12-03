let score = 0;
let timeLeft = 30;
let gameInterval;
let objectInterval;

const images = [
  "../assets/4.png",
  "../assets/3.png",
  "../assets/2.png",
  "../assets/1.png",
];

let currentImageIndex = 0;

document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}`;
  document.getElementById("game-area").innerHTML = "";
  currentImageIndex = 0;

  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}`;
  document.getElementById("game-area").innerHTML = "";

  gameInterval = setInterval(updateTimer, 1000);
  objectInterval = setInterval(createObject, 500);

  document.getElementById("game-area").addEventListener("mousemove", moveImage);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}`;

  if (timeLeft <= 0) {
    clearInterval(gameInterval);
    clearInterval(objectInterval);
    alert(`Game Over! Your score is: ${score}`);
  }
}

function createObject() {
  const object = document.createElement("img");
  object.src = "../assets/mopane_leaf.png";
  object.setAttribute("width", "50");
  object.setAttribute("height", "50");
  object.style.position = "absolute";
  object.style.top = Math.random() * 300 + "px";
  object.style.left = Math.random() * 700 + "px";

  object.addEventListener("click", function () {
    score++;
    document.getElementById("score").innerText = `Score: ${score}`;
    object.remove(); // Remove the clicked object

    if (score === 15) {
      currentImageIndex = (currentImageIndex + 1) % images.length; // Cycle through images
    }
  });

  function moveImage(event) {
    const objects = document.querySelectorAll("#game-area img");
    objects.forEach((object) => {
      object.style.left = `${event.clientX - 25}px`; // Adjust position to follow the cursor
      object.style.top = `${event.clientY - 25}px`;
    });
  }

  document.getElementById("game-area").appendChild(object); // Add the image to the game area
}
