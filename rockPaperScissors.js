
function main(){

    let buttonContainer = document.querySelector('.playerButtons');
    let scoreElement = document.querySelector('.scoreBoard');
    let resetButton = document.querySelector('#reset')
    makePlayerButtons(buttonContainer);

    let score = [0, 0];

    resetButton.style.visibility = 'hidden';
    resetButton.addEventListener('click', () => {
        score = [0, 0];
        scoreElement.textContent = `Score: ${score[0]} - ${score[1]}`;
        buttonContainer.addEventListener('click', humanChoiceButtonHandler(scoreElement, score, buttonContainer, resetButton));
    });



    buttonContainer.addEventListener('click', humanChoiceButtonHandler(scoreElement, score, buttonContainer, resetButton));
        
    
    
}


function humanChoiceButtonHandler(scoreElement, score, buttonContainer, resetButton) {
    return function updateScore(event) {
        event.stopPropagation();
        let targetID = event.target.id;
        if (targetID && targetID.includes('playerButton')){
            let selectedValue = parseInt(targetID.slice(-1));
            
            let winner = playRound(selectedValue, getComputerChoice());
            // yes i know this sucks to look at.
            winner === 1 ? score[0] += 1 : (winner === -1 ? score[1] += 1 : score = score);
            scoreElement.textContent = `Score: ${score[0]} - ${score[1]}`;
            console.log(score);
        }

        if (score[0] >= 5 || score[1] >= 5){
            buttonContainer.removeEventListener('click', updateScore);
            scoreElement.appendChild(document.createTextNode(`
                You ${score[0] >= 5 ? 'WON!' : 'LOST!'}`));
            resetButton.style.visibility = 'visible';
        }
    }
}

function makePlayerButtons(buttonContainer){
    for (let i = 0; i < 3; i++){
        let button = document.createElement("button");
        button.setAttribute("id", `playerButton${i}`);
        button.appendChild(document.createTextNode(`${value_to_rps(i)}`));
        buttonContainer.appendChild(button);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    return getRandomInt(3);
}

function assert(condition, msg){
    if (!condition){
        throw new Error(`Assertion Error: ${msg}`);
    }

}

function playRound(humanChoice, computerChoice) {
    let winner;
    let humanString = value_to_rps(humanChoice);
    let computerString = value_to_rps(computerChoice);

    document.querySelector('#human').textContent = humanString;
    document.querySelector('#computer').textContent = computerString;

    // rock = 0, paper = 1, scissors = 2
    // yes this logic is unnecessarily complicated.
    if (humanChoice === computerChoice) winner = 0;
    else {
        if (humanChoice %2 === 0 && computerChoice % 2 === 0) winner = (humanChoice - computerChoice) / -2;
        else {
            winner = humanChoice - computerChoice;
        }
    }

    if (!winner) {
        console.log(`Tie, both players chose ${humanString}`)
        return winner
    };
    
    winner === 1 ? console.log(`You Win! ${humanString} beats ${computerString}.`) : console.log(`You Lose! ${computerString} beats ${humanString}.`);

    return winner;

}

function value_to_rps(val){

    switch (val) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            throw new RangeError(`accepted value must be 0, 1, or 2: value = ${val}`);
    }
}

main();
