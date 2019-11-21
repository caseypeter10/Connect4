var gameBoard = [[0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]];
//bottom right corner of gameBoard accessed by [5][6]

var color = 1;
var isGameOver = false;
var AIPlayer = false;
var AIToggle

AIbutton = document.getElementById("AIbutton");
AIbutton.addEventListener("click", toggleAI);

colorButton = document.getElementById("colorButton");
colorButton.addEventListener("click", toggleColor);
    

//var colorButton = document.getElementById("");

document.addEventListener("keydown", function(event){
    var key = event.key;

    //Prevents dropping pieces if a player has won.
    if(isGameOver == false){
            switch (key) {
                //Prevents dropping pieces if the AI is active and it is the computer's turn.
                case "1":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 0);
                        dropPiece(0,colTop,color);
                        gameBoard[colTop][0] = color;
                        break;
                    }
                case "2":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 1);
                        dropPiece(1,colTop,color);
                        gameBoard[colTop][1] = color;
                        break;
                    }

                case "3":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 2);
                        dropPiece(2,colTop,color);
                        gameBoard[colTop][2] = color;
                        break;
                    }

                case "4":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 3);
                        dropPiece(3,colTop,color);
                        gameBoard[colTop][3] = color;
                        break;
                    }
                    
                case "5":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 4);
                        dropPiece(4,colTop,color);
                        gameBoard[colTop][4] = color;
                        break;
                    }
                
                case "6":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 5);
                        dropPiece(5,colTop,color);
                        gameBoard[colTop][5] = color;
                        break;
                    }
                    
                case "7":
                    if(AIPlayer == true && color == 2){
                        break;
                    } else {
                        colTop = evalColumnHeight(gameBoard, 6);
                        dropPiece(6,colTop,color);
                        gameBoard[colTop][6] = color;
                        break;
                }
            }        
        } 
    
        console.log("color is " + color);
        consoleBoardPrint(gameBoard);
        isGameOver = checkAllWins(gameBoard,color);
        console.log("is game over " + isGameOver);
            
        if(isGameOver == true && color == 1){
            console.log("red player has won.");
            setTimeout(function() {
                alert("Player 1 (red) wins");
              }, 1000);
        }

        if(isGameOver == true && color == 2){
            console.log("black player has won.");
            setTimeout(function() {
                alert("Player 2 (black) wins");
              }, 1000);
        }

        //player switching under PvP conditions
        if (color == 1){
            console.log("switching color to 2");
            color = 2;
        } else {
            // Only allowing the switching from player 2 to player 1 on keydown if there is no AI player
            if(AIPlayer == false){
                color = 1;
            }
        }
        console.log("At end of listener color is: " + color);
        console.log("At end of listener AI player is " + AIPlayer);
        while(AIPlayer == true && color == 2){
            console.log("in AI loop");
            allColumnTops = getColumnTops(gameBoard);
            console.log("All column tops is " + allColumnTops);
            AIMove = checkBlockingAndWinningOpportunities(allColumnTops, gameBoard, color);
            console.log("planned AI move " + AIMove);
            dropPiece(AIMove, allColumnTops[AIMove], color);
            console.log("AI manip game board array row: " + allColumnTops[AIMove] + "column: " + AIMove);
            gameBoard[allColumnTops[AIMove]][AIMove] = 2;
            consoleBoardPrint(gameBoard);

            isGameOver = checkAllWins(gameBoard,color);
            if(isGameOver == true){
                setTimeout(function() {
                    alert("Player 2 (black) wins");
                }, 1000);
                
            }

            color = 1;
            
        }
    })
    

 //end of keydown event listener

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetBoard);

//AI loop that only fires if the AI player is activated and it is player 2's turn


function dropPiece(columnChosen, topOfColumn, color){
    var divId = 0
    console.log("column Chosen " + columnChosen);
    console.log("topOfColumn " + topOfColumn);

    if(color == 1){
        divId = retrieveDiv(topOfColumn, columnChosen);
        document.getElementById("C"+divId).style.backgroundColor = "red";    
        document.getElementById("currentPlayer").innerHTML = "Player 2's turn (Black)";
    }

    if(color == 2){
        divId = retrieveDiv(topOfColumn, columnChosen);
        console.log("divId is: " + divId);

        document.getElementById("C"+divId).style.backgroundColor = "black";
        document.getElementById("currentPlayer").innerHTML = "Player 1's turn (Red)";        
    }
}

function retrieveDiv(row, column){
    divNum = 0 ;
    divNum += (column+1) ;
    divNum += (row*7) ;

    console.log("column " + column);
    console.log("row " + column); 
    console.log("divNum " + divNum);

    return divNum ;
}

function evalColumnHeight(array, columnChosen){
    columnTopFound = false;
    rowCounter = 5;
    columnTop = 0;
    console.log("column evaluated " + columnChosen);

    while(columnTopFound == false){
        if(array[rowCounter][columnChosen] == 0){
            columnTop = rowCounter;
            columnTopFound = true;
        } else {
            rowCounter--;
        }
    }
    return columnTop;
}

/* 
The check functions below are called as the gameboard array is looped through. If
a 1(red piece) or a 2(black piece)  is found during looping, the check win functions
will be called. If it is impossible for a win in a particular direction to occur, the 
function will terminate early.

For example, if a piece in the top left of the board is scanned any win condition
involving up or left will be impossible, and will not be executed
*/

//all rows and columns are zero indexed

function getColumnTops(gameBoardArray){
    columnTopList = [0,0,0,0,0,0,0];
    for(column = 0; column<7; column++){
        columnTopList[column] = evalColumnHeight(gameBoardArray, column);
    }
    console.log("column tops is: " + columnTopList)
    return columnTopList;
}

function checkBlockingAndWinningOpportunities(columnTopList, gameBoardArray, color){
    var column = 0;
    for(column = 0; column<7; column++){
        //getting winning opportunities
        console.log("column scanned in AI " + column);
        let winningBoardArray = JSON.parse(JSON.stringify(gameBoardArray));
        winningBoardArray[columnTopList[column]][column] = color;
        console.log("winning Board Array");
        consoleBoardPrint(winningBoardArray);

        console.log("Game Board Array is");
        consoleBoardPrint(gameBoardArray);
        
        var winningOpportunity = checkAllWins(winningBoardArray, color);
        console.log("Winning opportunity is: " + winningOpportunity);

        if (winningOpportunity == true){
            //if placing a piece in the "scanned" column, and a win would result, the column will be returned.
            console.log("column chosen " + column);
            return column;
        }
    }
    
    for(column = 0; column<7; column++){

        if(winningOpportunity == false){
                color = 1;
            }

            console.log("column is " + column);
            let blockingBoardArray = JSON.parse(JSON.stringify(gameBoardArray));
            
            blockingBoardArray[columnTopList[column]][column] = color;
            console.log("blocking Board Array");
            consoleBoardPrint(blockingBoardArray);
            console.log("color before blocking check " + color);
            var blockingOpportunity = checkAllWins(blockingBoardArray, color);
            console.log("Is there a blocking opportunity: " + blockingOpportunity);
            color = 2;
            
            //if placing a piece in the "scanned" column, and a win would be blocked, the column will be returned.
            if (blockingOpportunity == true){
                console.log("column chosen: " + column);
                return column;
                } else {
                    //if no blocking or winning opportunities are available, select random move.   
                    if(column == 6){
                        column = Math.floor((Math.random() * 7));
                        console.log("column chosen: " + column);
                        return column;
                }
            }
        }
    }

function checkAllWins(board, color){
    var playerWon = false;
    console.log("in checkAllWins");
    console.log("color in checkAllWins: " + color);
    
    for(row = 0; row<6; row++){
        for(column = 0; column<7; column++){
            
            if(board[row][column] != 0){
                console.log("checking cell in row s " + row + " column " + column);
                playerWon = checkUpWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}
                
                playerWon = checkDownWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}
                
                playerWon = checkLeftWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}

                playerWon = checkRightWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}

                playerWon = checkUpRightDiagWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}

                playerWon = checkDownRightDiagWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}

                playerWon = checkDownLeftDiagWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}

                playerWon = checkUpLeftDiagWin(board, row, column, color);
                if(playerWon == true){ return playerWon;}
            }
        }
    }
    return false;  
}

function checkUpWin(board, row, column, color){
    //exit condition
    if(row < 3){
        return;
    } else {
        //check if array contents upward from (row, column) match the color of (row, column)
        //console.log("checking up win condition");
        //console.log(board[row][column]);
        //console.log(board[row - 1][column]);
        //console.log(board[row - 2][column]);
        //console.log(board[row - 3][column]);

        if(board[row][column] == color && board[row - 1][column] == color && board[row - 2][column] == color &&  board[row - 3][column] == color){
            console.log("u r winner");
            return true;
        } else {
            return;
        }
    }
}

function checkDownWin(board, row, column, color){
    //exit condition
    if(row > 2){
        return;
    } else {
        console.log("checking down win condition");
        console.log(board[row][column]);
        console.log(board[row + 1][column]);
        console.log(board[row + 2][column]);
        console.log(board[row + 3][column]);
        //check if array contents downwar from (row, column) match the color of (row, column)
        if(board[row][column] == color && board[row + 1][column] == color && board[row + 2][column] == color &&  board[row + 3][column] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkLeftWin(board, row, column, color){
    if(column < 3){
        return;
    } else {
        //Check if array contents to the left of (row, column) match the color of (row, column)
        if(board[row][column] == color && board[row][column - 1] == color && board[row][column - 2] == color && board[row][column - 3] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkRightWin(board, row, column, color){
    if(column > 3){
        return;
    } else {
        console.log("checking right win condition.");
        console.log(board[row][column]);
        console.log(board[row][column + 1]);
        console.log(board[row][column + 2]);
        console.log(board[row][column + 3]);

        if(board[row][column] == color && board[row][column + 1] == color && board[row][column + 2] == color && board[row][column + 3] == color){
            console.log("right win activated");
            return true;
        } else {
            return;
        }
    }
}

function checkUpRightDiagWin(board, row, column, color){
    //exit condition
    if(row < 3 || column > 3){
        return;
    } else {
        //check if array contents up and to the right from (row, column) match the color of (row, column)
        if(board[row][column] == color && board[row - 1][column + 1] == color && board[row - 2][column + 2] == color &&  board[row - 3][column + 3] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkDownRightDiagWin(board, row, column, color){
    //exit condition
    if(row > 2 || column > 3){
        return;
    } else {
        //check if array contents down and to the right from (row, column) match the color of (row, column)
        if(board[row][column] == color && board[row + 1][column + 1] == color && board[row + 2][column + 2] == color &&  board[row + 3][column + 3] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkDownLeftDiagWin(board, row, column, color){
    //exit condition
    if(row > 2 || column < 3){
        return;
    } else {
        //check if array contents down and to the left from (row, column) match the color of (row, column)
        if(board[row][column] == color && board[row + 1][column - 1] == color && board[row + 2][column - 2] == color &&  board[row + 3][column - 3] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkUpLeftDiagWin(board, row, column, color){
    //exit condition
    if(row < 3 || column <3){
        return;
    } else {
        //check if array contents up and to the left from (row, column) match the color of (row, column)
        if(board[row][column] == color && board[row - 1][column - 1] == color && board[row - 2][column - 2] == color &&  board[row - 3][column - 3] == color){
            return true;
        } else {
            return;
        }
    }
}

function consoleBoardPrint(board){
    for(var index = 0; index < board.length; index++){
        console.log(board[index]);
    }
}

function resetBoard(){
        console.log("clicked reset button");
        gameBoard = [[0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0]];
        color = 1;
        document.getElementById("currentPlayer").innerHTML = "Player 1's turn (Red)"; 
        isGameOver = false; 
        for(divId= 1; divId<=42; divId++){
            document.getElementById("C"+divId).style.backgroundColor = "white";
    }
}

function toggleAI(){
    console.log("toggling AI");
    console.log("AI before toggle " + AIPlayer);
    if(AIPlayer == false){
        AIPlayer = true;
        console.log("AI after toggle " + AIPlayer);
        return;
    } else {
        console.log("AI after toggle " + AIPlayer);
        AIPlayer = false;
        return;
    }
}

function toggleColor(){
    background = document.getElementById("background");
    if(background.style.backgroundColor == "red"){
        background.style.backgroundColor = "green";
    } else {
        background.style.backgroundColor = "red";
    }
}
