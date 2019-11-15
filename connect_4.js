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




