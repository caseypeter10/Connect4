var gameBoard = [[0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]];

var color = 1
var isGameOver = false;

//bottom right corner of gameBoard accessed by [5][6]

document.addEventListener("keydown", function(event){
    var key = event.key;
    
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

    console.log("color is " + color);
    consoleBoardPrint(gameBoard);
    isGameOver = checkAllWins();
        
    if(isGameOver == true && color == 1){
        console.log("red player has won.");
    }

    if(isGameOver == true && color == 2){
        console.log("black player has won.");
    }

    //player switching 
    }
    if (color == 1){
        color = 2;
    } else {
        color = 1;
    }
    

})

function dropPiece(columnChosen, topOfColumn, color){
    var divId = 0
    console.log("column Chosen " + columnChosen);
    console.log("topOfColumn " + topOfColumn);

    if(color == 1){
        divId = retrieveDiv(topOfColumn, columnChosen);
        document.getElementById("C"+divId).style.backgroundColor = "red";    
    }

    if(color == 2){
        divId = retrieveDiv(topOfColumn, columnChosen);
        document.getElementById("C"+divId).style.backgroundColor = "black";        
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
a 1(red piece) or a 2(black piece)  is found during looping. The check win functions
will be called. If it is impossible for a win in a particular direction to occur, the 
function will terminate early.

For example, if a piece in the top left of the board is scanned any win condition
involving up or left will be impossible, and will not be executed
*/

//all rows and columns are zero indexed
function checkAllWins(board, row, column, color){
    var playerWon = false;
    
    for(rows = 0; rows<6; rows++){
        for(columns = 0; columns<7; columns++){
            playerWon = checkUpWin(board, row, column, color);
            playerWon = checkDownWin(board, row, column, color);
            playerWon = checkLeftWin(board, row, column, color);
            playerWon = checkRightWin(board, row, column, color);
            playerWon = checkUpRightDiagWin(board, row, column, color);
            playerWon = checkDownRightDiagWin(board, row, column, color);
            playerWon = checkDownLeftDiagWin(board, row, column, color);
            playerWon = checkUpLeftDiagWin(board, row, column, color);
            
            if(playerWon == true){
                return playerWon;
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
        if(board[row - 1][column] == color && board[row - 2][column] == color &&  board[row - 3][column] == color){
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
        //check if array contents downwar from (row, column) match the color of (row, column)
        if(board[row + 1][column] == color && board[row + 2][column] == color &&  board[row + 3][column] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkLeftWin(board, row, column, color){
    if(col < 3){
        return;
    } else {
        //Check if array contents to the left of (row, column) match the color of (row, column)
        if(board[row][column - 1] == color && board[row][column - 2] == color && board[row][column - 3] == color){
            return true;
        } else {
            return;
        }
    }
}

function checkRightWin(board, row, column, color){
    if(col > 3){
        return;
    } else {
        if(board[row][column + 1] == color && board[row][column + 2] == color && board[row][column + 3] == color){
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
        if(board[row - 1][column + 1] == color && board[row - 2][column + 2] == color &&  board[row - 3][column + 3] == color){
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
        if(board[row + 1][column + 1] == color && board[row + 2][column + 2] == color &&  board[row + 3][column + 3] == color){
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
        if(board[row + 1][column - 1] == color && board[row + 2][column - 2] == color &&  board[row + 3][column - 3] == color){
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
        if(board[row - 1][column - 1] == color && board[row - 2][column - 2] == color &&  board[row - 3][column - 3] == color){
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