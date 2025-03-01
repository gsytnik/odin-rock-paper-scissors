
function main(){

    let humanScore, computerScore;
    humanScore = computerScore = 0;

    for (let i = 0; i < 5; i++) {
        let winner = playRound(getHumanChoice(), getComputerChoice());
        if (winner) winner === 1 ? humanScore ++ : computerScore ++;
    }

    console.log(
    `Final Score:
    You: ${humanScore}
    Computer: ${computerScore}
    
    You ${humanScore < computerScore ? "LOSE!" : (computerScore === humanScore ? "TIE!" : "WIN!")}
    `);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    return getRandomInt(3);
}

function getHumanChoice(){
    let response;
    do {
        response = prompt("rock, paper, scissors", -1);
        if (response) response = response.toLowerCase();

    } while (response !== "rock" && response !== "paper" && response !== "scissors");

    if (response === "rock") return 0;
    
    assert(response === "paper" || response === "scissors", `Response is one of paper or scissors: response = ${response}`);
    return response === "paper" ? 1 : 2;
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

    // rock = 0, paper = 1, scissors = 2
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
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            throw new RangeError(`accepted value must be 0, 1, or 2: value = ${val}`);
    }
}

main();
