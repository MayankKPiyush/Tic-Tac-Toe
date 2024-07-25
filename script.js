let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, PlayerO

// winiing pattern (2D Array)
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            // PlayerO+
            box.innerText = "O"
            turnO = false;
        } else {
            // PlayerX
            box.innerText ="X";
            turnO  = true;
        }
        box.disabled = true; // after X/O it doesn't changes to O/X

        checkWinner(); // check who won
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinners = (winner) => {
    msg.innerText = `congratulation, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(pattern of winPatterns) {
        /*
        console.log(pattern[0], pattern[1], pattern[2]);
        console.log(
            boxes[pattern[0]].innerText, 
            boxes[pattern[1]].innerText, 
            boxes[pattern[2]].innerText
        ); // check for each Boxes
        */

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // doesn't check for empty boxes
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinners(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);