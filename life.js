$(document).ready(function() {
	var start, board;
	var numRows = 0;
	var numCols = 0;

	var makeTable = function(rows, columns) {
		var toRet = "";
		numRows = rows;
		numCols = columns;
		board = new Array(rows);
		for (var i = 0; i < rows; i++) {
			board[i] = new Array(columns);
			toRet += "<tr>";
			for (var j = 0; j < columns; j++) {
				toRet += "<td" + " data-row=\"" + String(i) + "\" data-column=\"" + String(j) + "\"" + "></td>";
			}
			toRet += "</tr>";
		}
		return toRet;
	};
	var isAlive = function(row, col) {
		if (board[row][col] !== undefined) {
			return true;
		}
		else {
			return false;
		}
	};
	var getLiveNeighbors = function(r, c) {
		var liveNeighbors = 0;
		for (var row = r-1; row < r+2 && row < numRows; row++) {
			if (row >= 0) {
				for (var col = c-1; col < c+2 && col < numCols; col++) {
					if (col >= 0) {
						if (!(row === r && col === c)) { 
							if (isAlive(row, col)) { liveNeighbors++; }
						}
					}
				}
			}
		}
		return liveNeighbors;
	};
	var step = function() {
		// iterate through each cell
			// iterate through each neighbor
				// if alive increment liveNeighbors
			// change cell state based on liveNeighbors

		// rules:
			// dead cell with exactly 3 live neighbors becomes alive
			// live cell with two or three live neighbors stays alive
			// else stays dead or dies
		var tempBoard = board;
		for (var row = 0; row < numRows; row++) {
			for (var col = 0; col < numCols; col++) {
				var liveNeighbors = getLiveNeighbors(row, col);
				if (isAlive(row, col)) {
					if (!(liveNeighbors === 2 || liveNeighbors === 3)) {
						tempBoard[row][col] = undefined;
						$("td[data-row=" + row + "][data-column=" + col+ "]").css("background-color", "white");
					}
				}
				else { // dead
					if (liveNeighbors === 3) {
						tempBoard[row][col] = 1;
						$("td[data-row=" + row + "][data-column=" + col+ "]").css("background-color", "black");
					}
					else {
						tempBoard[row][col] = undefined;
						$("td[data-row=" + row + "][data-column=" + col+ "]").css("background-color", "white");
					}
				}
			}
		}
		board = tempBoard;
	};

	$("table").html(makeTable(30,50));
	$("td").on("click", function() {
		$(this).css("background-color", "black");
		var row = $(this).attr("data-row");
		var col = $(this).attr("data-column");
		board[row][col] = 1;
	});
	$("#step").on("click", function() {
		step();
	});
});