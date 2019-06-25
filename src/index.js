import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
/* REPLACE the class with a function!!!
class Square extends React.Component {

  //Delete below because Square no longer needs to keep track of game state 
  // constructor(props) {
  //   super(props); 
  //   this.state = {
  //     value: null,
  //   };
  // }
  
  render() {
    return (

      This is what happens when we click a square 

      //When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:
  
      //1. The onClick prop on the built-in DOM <button> component tells React to set up a CLICK EVENT LISTENER.
      //2. When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
      //3. This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
      //4. Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
      //5. We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a function”.
      
      <button 
        className="square" 
        onClick={() => this.props.onClick({value: 'X'})} //replace this.setState 
      > 
        {this.props.value} //replace this.state.value 
      </button>
    );
  }
}
*/
function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

//Board component maintains which squares are filled 
//Need to update Board's state from the Square 
class Board extends React.Component {
  
  // constructor(props) {
  //   super(props); 
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true, //boolean will be flipped everytime a player goes next 
  //   };
  // }

  /*
  handleClick(i){
    const squares = this.state.squares.slice(); //creates a copy of the squares array to modify instead of modifying the existing array
    if (calculateWinner(squares) || squares[i]) { //if the square is already filled or there is a winner, then return early 
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

  }
  */

  renderSquare(i) {
    return (
      < Square 
        value= {this.props.squares[i]} 
        onClick= {() => this.props.onClick(i)}
      />
    );
  }

  render() {

    //const winner = calculateWinner(this.state.squares)
    
    // let status; 
    
    // if (winner) {
    //   status = 'Winner: ' + winner; 
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O')
    // }
    

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(props){
    super(props); 
    this.state = {
      history:[{
        squares: Array(9).fill(null),
      }], 
      xIsNext: true, 
    };
  }

  handleClick(i){
    const history = this.state.history; 
    const current = history[history.length-1]; 
    const squares = current.squares.slice(); 

    if (calculateWinner(squares) || squares[i]){
      return; 
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });

  }
  render() {
    const history = this.state.history; 
    const current = history[history.length-1]; //last, most recent board 
    const winner = calculateWinner(current.squares);


    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move : 
        'Go to game start'; 
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    }); 
    let status;

    if (winner) {
      status = "Winner: " + winner; 
    } else { 
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)} 
          />
        </div>
        <div className="game-info">
          <div> { status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
