
let turn = '0';

let ai = 'X';
let human = '0';
let currentplayer = human;
let gameover = false;


let wins = [];
for (let i = 0; i < 9; i++)
    wins.push(i);
console.log(wins);


let scores = {
    'X': 10,
    '0': -10,
    'tie': 0
};


document.getElementsByClassName('spaninfo')[0].innerText = "Turn of " + turn;

// to change the turn
const changeTurn = () => {
    if (turn === 'X')
        return '0';
    else
        return 'X';
};

// main logic
let boxes = document.getElementsByClassName("gamebox");
if (currentplayer == human)
{
    let flag = false;
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        
            element.addEventListener("click", () => {
                // if (currentplayer == human)
                    if (boxtext.innerText === '') 
                    {
                        console.log("Entered main logic!!!");
                        boxtext.innerText = human;
                        turn = changeTurn();
                        let winner = checkWin();
                        flag = true;

                        if (winner === 'tie')
                        {
                            document.querySelector('.spaninfo').innerText = "Game Draw!!!";
                            document.querySelector('.result').innerText = "Game Draw!!!";
                            gameover = true;
                        }
                        
                        if (!gameover)
                        {
                            document.getElementsByClassName('spaninfo')[0].innerText = "Turn of " + turn;
                        }
                    }
                    if (flag)
                    {
                        currentplayer = ai;
                        bestMove();
                    }
            })
    })
}

// to reset screen
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    })
    turn = changeTurn();
    document.getElementsByClassName('spaninfo')[0].innerText = "Turn of " + turn;
    gameover = false;
    document.querySelector('#imgbox').getElementsByTagName('img')[0].style.width = "0px";
    // document.querySelector('.line').style.width = "0vw";
    document.getElementsByClassName('result')[0].innerText = "";
})


function setup() {
  console.log("Entered setup")
//   createCanvas(400, 400);
//   w = width / 3;
//   h = height / 3;
//   bestMove();
}


function bestMove() {
    console.log("Entered best move!!!");

    let bestScore = -Infinity;
    let move;

    let boxtext = document.getElementsByClassName('boxtext');
    wins.forEach(e => {
        if (boxtext[e].innerText === '')
        {
            boxtext[e].innerText = ai;
            let score = minimax(boxtext, 0, false);
            boxtext[e].innerText = '';

            if (score > bestScore)
            {
                bestScore = score;
                move = e;
            }
            
        }
    })

    // for putting ai value in box
    wins.forEach(e => {
        if (e == move)
        {
            boxtext[move].innerText = ai;        
        }
    })
    currentplayer = human;
}


function minimax(boxtext, depth, isMaximizing)
{
    console.log("Entered minimax!!!");
    // sleep(3000);

    let result = checkWin();
    if (result !== null)
    {
        console.log('result: ', scores[result], ' ', typeof result);
        return scores[result];
    }

    if (isMaximizing)
    {
        let bestScore = -Infinity;
        let boxtext = document.getElementsByClassName('boxtext');
        wins.forEach(e => {
            if (boxtext[e].innerText === '')
            {
                boxtext[e].innerText = ai;
                let score = minimax(boxtext, depth+1, false);
                boxtext[e].innerText = '';
                bestScore = Math.max(bestScore, score);
            }
        })
        return bestScore;
    }
    else
    {
        let bestScore = Infinity;
        let boxtext = document.getElementsByClassName('boxtext');
        wins.forEach(e => {
            if (boxtext[e].innerText === '')
            {
                boxtext[e].innerText = human;
                let score = minimax(boxtext, depth+1, true);
                boxtext[e].innerText = '';
                bestScore = Math.min(bestScore, score);
            }
        })
        return bestScore;
    }
}


// to check win
function checkWin() {
    console.log("Entered check win!!!");
    let winner = null;

    // for draw
    const isDraw = () => {
        let boxtext = document.querySelectorAll('.boxtext');
        let count = 9;
        Array.from(boxtext).forEach(element => {
            if (element.innerText !== '')
                count -= 1;
            
        })
        return count;
    }

    let boxtext = document.getElementsByClassName('boxtext');

    let winsCombination = [
        [0, 1, 2, -13, 7, 0],
        [3, 4, 5, -13, 17, 0],
        [6, 7, 8, -13, 27, 0],
        [0, 3, 6, -23, 17, 90],
        [1, 4, 7, -13, 17, 90],
        [2, 5, 8, -3, 17, 90],
        [0, 4, 8, -15, 15, 45],
        [2, 4, 6, -10, 15, 135]
    ];


    winsCombination.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.spaninfo').innerText = boxtext[e[0]].innerText + " Won";
            document.querySelector('.result').innerText = boxtext[e[0]].innerText + " Won";
            winner = boxtext[e[0]].innerText;
            gameover = true;
            document.querySelector('#imgbox').getElementsByTagName('img')[0].style.width = "170px";
            
            // document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            // document.querySelector('.line').style.width = "20vw";
        }
    })
    let count = isDraw();
    console.log('Winner: ', winner);
    if (count==0 && winner==null)
        return "tie";
    else
    {
        document.querySelector('#imgbox').getElementsByTagName('img')[0].style.width = "0px";
        // document.querySelector('.line').style.width = "0vw";
        document.getElementsByClassName('result')[0].innerText = "";
        return winner;
    }
}

