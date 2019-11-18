var gameBoard = [[0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]];

var color = 1;
var isGameOver = false;
var AIPlayer = false;

//bottom right corner of gameBoard accessed by [5][6]

document.addEventListener("keydown", function(event){
    var key = event.key;

    //Prevents dropping pieces if a player has won.
    if(isGameOver == false){
        
    
        switch (key) {
            case "1":
                colTop = evalColumnHeight(gameBoard, 0);
                dropPiece(0,colTop,color);
                gameBoard[colTop][0] = color;
                break;
            case "2":
                colTop = evalColumnHeight(gameBoard, 1);
                dropPiece(1,colTop,color);
                gameBoard[colTop][1] = color;
                break;
            case "3":
                colTop = evalColumnHeight(gameBoard, 2);
                dropPiece(2,colTop,color);
                gameBoard[colTop][2] = color;
                break;
            case "4":
                colTop = evalColumnHeight(gameBoard, 3);
                dropPiece(3,colTop,color);
                gameBoard[colTop][3] = color;
                break;
            case "5":
                colTop = evalColumnHeight(gameBoard, 4);
                dropPiece(4,colTop,color);
                gameBoard[colTop][4] = color;
                break;
            case "6":
                colTop = evalColumnHeight(gameBoard, 5);
                dropPiece(5,colTop,color);
                gameBoard[colTop][5] = color;
                break;
            case "7":
                colTop = evalColumnHeight(gameBoard, 6);
                dropPiece(6,colTop,color);
                gameBoard[colTop][6] = color;
                break;
            }

        console.log("color is " + color);
        consoleBoardPrint(gameBoard);
        isGameOver = checkAllWins(gameBoard,color);
        console.log("is game over " + isGameOver);
            
        if(isGameOver == true && color == 1){
            console.log("red player has won.");
            alert("Player 1 (red) wins");
        }

        if(isGameOver == true && color == 2){
            console.log("black player has won.");
            alert("Player 2 (black) wins");
        }

        //player switching 
        if (color == 1){
            color = 2;
        } else {
            color = 1;
        }
    }
}) //end of keydown event listener

var resetButton = document.getElementById("reset")
resetButton.addEventListener("click", resetBoard);

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
        document.getElementById("C"+divId).style.backgroundColor = "black";
        document.getElementById("currentPlayer").innerHTML = "Player 1's turn (Red)";        
    }
}

function retrieveDiv(row, column){
    divNum = 0 ;
    divNum += (column+1) ;
    divNum += (row*7) ;
    console.log("divNum " + divNum);

    return divNum ;
}

function evalColumnHeight(array, columnChosen){
    columnTopFound = false;
    rowCounter = 5;
    columnTop = 0;
    console.log("column chosen " + columnChosen);

    while(columnTopFound == false){
        if(array[rowCounter][columnChosen] == 0){
            columnTop = rowCounter;
            columnTopFound = true;
        } else {
            rowCounter--;
        }
    }
    console.log(columnTopFound);
    console.log(rowCounter);
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
        columnTopList[column] = evalColumnHeight();
    }
    return columnTopList;
}

function checkBlockingAndWinningOpportunities(columnTopList, gameBoardArray, color){
    for(column = 0; column<7; column++){
        //getting winning opportunities
        var winningBoardArray = gameBoardArray;

        winningBoardArray[columnTopList[column]][column] = color;
        var winningOpportunity = checkAllWins(winningBoardArray, color);
        if (winningOpportunity == true){
            //if placing a piece in the "scanned" column, and a win would result, the column will be returned.
            return column;
        }

        if(winningOpportunity == False){
            if(color == 1){
                color = 2;
            } else {
                color = 1;
            }

            var blockingBoardArray = gameBoardArray;
            var blockingOpportunity = checkAllWins(blockingBoardArray);
            
            //if placing a piece in the "scanned" column, and a win would be blocked, the column will be returned.
            if (blockingOpportunity == true){
                return column;
            } else {
                //if no blocking or winning opportunities are available, select
                return Math.floor((Math.random() * 7) + 1);
            }
        }
    }
}

function checkAllWins(board, color){
    var playerWon = false;
    console.log("in checkAllWins");
    
    for(row = 0; row<6; row++){
        for(column = 0; column<7; column++){
            
            if(board[row][column] != 0){
                console.log("checking cell in row s" + row + " column " + column);
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
        console.log("checking up win condition");
        console.log(board[row][column]);
        console.log(board[row - 1][column]);
        console.log(board[row - 2][column]);
        console.log(board[row - 3][column]);

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
        if(board[row][column] == color && board[row][column + 1] == color && board[row][column + 2] == color && board[row][column + 3] == color){
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