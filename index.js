// accessing all the html elements
let container = document.querySelector(".container");
let weaponBox = document.querySelector(".weapon-box");
let weapons = document.querySelectorAll(".weapons div");
let choicesBox = document.querySelector(".choices");
let player = document.querySelector(".player-choice img");
let computer = document.querySelector(".computer-choice img");
let resultBox = document.querySelector(".result-box");
let resultTxt = resultBox.querySelector("h3");
let playAgainBtn = resultBox.querySelector("button");
let wonValue = document.querySelector(".score-box .won h3 span");
let lostValue = document.querySelector(".score-box .lost h3 span");
let drawValue = document.querySelector(".score-box .draw h3 span");

// Initialize the scores
let won = 0, lost = 0, draw = 0;

// Define the computer possible choices
let computerChoices = ["Rock", "Paper", "Scissors"];

// Define the possible outcomes of the game
let outcomes = {
    RockRock: "Draw",
    RockPaper: "Computer",
    RockScissors: "You",
    PaperPaper: "Draw",
    PaperRock: "You",
    PaperScissors: "Computer",
    ScissorsScissors: "Draw",
    ScissorsRock: "Computer",
    ScissorsPaper: "You"
}

// add event listener to the weapons
for(let i = 0; i < weapons.length; i++){
    weapons[i].addEventListener("click", (e) => {

        // Set the revealing hands to rock
        player.src = "image/Rock.png";
        computer.src = "image/Rock.png";

        // Hide the weapon box and show the choices 
        weaponBox.style.display = "none";
        choicesBox.style.display = "block";
        
        // Add a delay before showing the player choices
        setTimeout( () => {
            choicesBox.classList.add("active");
        }, 1000);

        // Pause the animation of revealing hands after 3 seconds
        setTimeout( () => {
            let playerChoices = choicesBox.querySelectorAll("div");
            for(i = 0; i < playerChoices.length; i++){
                playerChoices[i].style.animationPlayState = "paused";
            }

            // Set the player choice to the selected weapon
            player.src = e.target.src;

            // Generate a random computer choice
            let randomChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
            computer.src = `image/${randomChoice}.png`;

            //Get the user choice and random choice to determine the outcome
            let userChoice = e.target.parentElement.className;
            let outcomeValue = outcomes[userChoice + randomChoice];

            //Show the result
            showResult(outcomeValue);
        }, 3000);
    });
}

// Function to show the result of the game
let showResult = (result) => {
    console.log(result);

    //Show the result box and set the container height
    container.style.height = "455px";
    resultBox.style.display = "block";

    //Update the result text and score
    if(result === "You"){
        resultTxt.innerHTML = "Congrats, You Won! &#x1F389;";
        won++;
        wonValue.innerHTML = won;
    }else if(result === "Computer"){
        resultTxt.innerHTML = "You Lost!";
        lost++;
        lostValue.innerHTML = lost;
    }else{
        resultTxt.innerHTML = "Match Draw!";
        draw++;
        drawValue.innerHTML = draw;
    }
}

// Add event listener to the play again button
playAgainBtn.addEventListener("click", () => {
    // Reset the game state
    choicesBox.classList.remove("active");
    container.style.height = "420px";
    resultBox.style.display = "none";
    weaponBox.style.display = "block";
    choicesBox.style.display = "none";

    // Resume the animation on the revealing hands when player choose his weapon
    let playerChoices = choicesBox.querySelectorAll("div");
    for(i = 0; i < playerChoices.length; i++){
        playerChoices[i].style.animationPlayState = "running";
    }
});