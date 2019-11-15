var gameBoard = [[0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]]

//bottom right corner of array accessed by [5][6]

document.addEventListener("keydown", function(event){
    var key = event.key;

    switch (key) {
        case "1":
            colTop = evalColumnHeight(gameBoard, 0);
            break;
        case "2":
            colTop = evalColumnHeight(gameBoard, 1);
            break;
        case "3":
            colTop = evalColumnHeight(gameBoard, 2);
            break;
        case "4":
            colTop = evalColumnHeight(gameBoard, 3);
            break;
        case "5":
            colTop = evalColumnHeight(gameBoard, 4);
            break;
        case "6":
            colTop = evalColumnHeight(gameBoard, 5);
            break;
    }
})

evalColumnHeight(array, columnChosen){
    columnTopFound = false;
    rowCounter = 0;
    columnTop = 0;

    while(column_top_found == false){
        if(array[columnChosen][rowCounter] == 0){
            columnTop = rowCounter;
            columnTopFound = true;
        } else {
            rowCounter++;
        }
    }
    return columnTop;
}

/* 
The check functions below are called as the gameboard array is looped through. If
a 1(black piece) or a 2(red piece)  is found during looping. The check win functions
will be called. If it is impossible for a win in a particular direction to occur, the 
function will terminate early.

For example, if a piece in the top left of the board is scanned any win condition
involving up or left will be impossible, and will not be executed
*/

//all rows and columns are zero indexed
checkUpWin(board, row, column, color){
    //exit condition
    if(row < 3){
        return;
    } else {
        //check if array contents upward from (row, column) match the color of (row, column)
        if(board[row - 1][column] == color && board[row - 2][column] == color &&  board[row - 3][column] == color){
            //color wins
        } else {
            return;
        }
    }
}

checkDownWin(board, row, column, color){
    //exit condition
    if(row > 2){
        return;
    } else {
        //check if array contents downwar from (row, column) match the color of (row, column)
        if(board[row + 1][column] == color && board[row + 2][column] == color &&  board[row + 3][column] == color){
            //color wins
        } else {
            return;
        }
    }
}

checkUpRightDiag(board, row, column, color){
    //exit condition
    if(row < 3 || column > 3){
        return;
    } else {
        //check if array contents up and to the right from (row, column) match the color of (row, column)
        if(board[row - 1][column + 1] == color && board[row - 2][column + 2] == color &&  board[row - 3][column + 3] == color){
            //color wins
        } else {
            return;
        }
    }
}

checkDownRightDiag(board, row, column, color){
    //exit condition
    if(row > 2 || column > 3){
        return;
    } else {
        //check if array contents down and to the right from (row, column) match the color of (row, column)
        if(board[row + 1][column + 1] == color && board[row + 2][column + 2] == color &&  board[row + 3][column + 3] == color){
            //color wins
        } else {
            return;
        }
    }
}

checkDownLeftDiag(board, row, column, color){
    //exit condition
    if(row > 2 || column < 3){
        return;
    } else {
        //check if array contents down and to the left from (row, column) match the color of (row, column)
        if(board[row + 1][column - 1] == color && board[row + 2][column - 2] == color &&  board[row + 3][column - 3] == color){
            //color wins
        } else {
            return;
        }
    }
}

checkUpLeftDiag(board, row, column, color){
    //exit condition
    if(row < 3 || column <3){
        return;
    } else {
        if(board[row - 1][column - 1] == color && board[row - 2][column - 2] == color &&  board[row - 3][column - 3] == color){
            //color wins
        } else {
            return;
        }
        //check if array contents up and to the left from (row, column) match the color of (row, column)
    }
}