let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let popupRef2 = document.querySelector(".popup2");
let newgameBtn = document.getElementById("new-game");
let startBtn = document.getElementById("start");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player 'O' plays first
let xTurn = false;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // enable popup
    popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable popup
    popupRef.classList.add("hide");
};

const enableButtons2 = () => {
    // disable popup
    popupRef2.classList.add("hide");
};

// New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Start
startBtn.addEventListener("click", () => {
    count = 0;
    enableButtons2();
});

// Restart
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == 'X') {
        msgRef.innerHTML = "&#x1f389; <br> 'X' wins";
    }
    else {
        msgRef.innerHTML = "&#x1f389; <br> 'O' wins";
    }
};

// Function for Draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1f60e; <br> It's a Draw";
};

// Win Ligic
const winChecker = () => {
    // Loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // Check if elements are filled 
        // If 3 empty elements are same and would give win as would
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                // If all 3 buttons have same values, 
                // then pass the value to the winFunction
                winFunction(element1);
            }
        }
    }
};

// Display X/O on click 
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;
            // Display Y
            element.innerText = "O";
            element.disabled = true;
        }
        // Increment count on each click
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        // check for win on every click
        winChecker();
    });
});

// Enable Buttons and disable popup on page load 
window.onload = enableButtons;