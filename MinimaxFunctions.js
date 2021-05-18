var maxDepth = 3;

function minFunAB(board, alpha, beta, depth) { //nogriežņa minimuma atrašana
  if (depth >= maxDepth) {
    board.setScore();
    return board.score;
  }


  if (board.isDead()) {      //punktu piešķiršana attiecīgi MI puses un pašreizēja galda iznākuma
    if (whiteAI && whitesMove) {
      return 200;
    }
    if (blackAI && !whitesMove) {
      return -200;
    }
  }

  if (board.hasWon()) {     //punktu piešķiršana attiecīgi MI puses un pašreizēja galda iznākuma

    if (whiteAI && whitesMove) {
      return -200;
    }
    if (blackAI && !whitesMove) {
      return 200;
    }
  }

  var boards = board.generateNewBoardsWhitesTurn(); //gājienu ģenerēšana
  var lowestBoardNo = 0;
  var lowestScore = 300;
  for (var i = 0; i < boards.length; i++) {

    var score = maxFunAB(boards[i], alpha, beta, depth + 1);
    if (depth == 0) {
    }
    if (score < lowestScore) {
      lowestBoardNo = i;
      lowestScore = score;
    } else {
      if (depth == 0 && score == lowestScore) {
        if (random(1) < 0.3) {
          lowestBoardNo = i;
        }
      }
    }
    if (score < alpha) {
      return lowestScore;
    }
    if (score < beta) {
      beta = score;          //beta nogriešana
    }

  }

  if (depth == 0) {
    return boards[lowestBoardNo];
  }
  return lowestScore;
}
//---------------------------------------------------------------------------------------
function maxFunAB(board, alpha, beta, depth) { //nogriežņa maksimuma atrašana
  if (depth >= maxDepth) {
    board.setScore();
    return board.score;
  }

  if (board.isDead()) {      //punktu piešķiršana attiecīgi MI puses un pašreizēja galda iznākuma
    if (whiteAI && whitesMove) {
      return 200;
    }
    if (blackAI && !whitesMove) {
      return -200;
    }
  }

  if (board.hasWon()) {    //punktu piešķiršana attiecīgi MI puses un pašreizēja galda iznākuma
    if (whiteAI && whitesMove) {
      return -200;
    }
    if (blackAI && !whitesMove) {
      return 200;
    }
  }

  var boards = board.generateNewBoardsBlacksTurn(); //gājienu ģenerēšana
  if (depth == 0) {
  }
  var topBoardNo = 0;
  var topScore = -300;
  for (var i = 0; i < boards.length; i++) {

    var score = minFunAB(boards[i], alpha, beta, depth + 1);
    if (score > topScore) {
      topBoardNo = i;
      topScore = score;
    } else {
      if (depth == 0 && score == topScore) {
        if (random(1) < 0.3) {
          topBoardNo = i;
        }
      }
    }
    if (score > beta) {
      return topScore;
    }
    if (score > alpha) {                   //alfa nogriešana
      alpha = score;
    }

  }

  if (depth == 0) {
    return boards[topBoardNo];
  }
  return topScore;
}
