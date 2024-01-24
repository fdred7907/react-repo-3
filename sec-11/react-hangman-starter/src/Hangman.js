import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.hasWon = this.hasWon.bind(this);
    this.reset = this.reset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  //if won the game 
  // check if every letter of answer is in guessed set
  // pass an array of true or false for every operation above
  // if the resulting array has one false return not won 
  hasWon(){
    let hasWonArr = this.state.answer.split("").map(ltr => (this.state.guessed.has(ltr)?true:false));
    return !hasWonArr.includes(false);
  }

  //reset button
  // reset state to black state
  reset(){
    this.setState({
      nWrong:0,
      guessed:new Set(),
      answer:randomWord(),
    })
  };

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,idx) => {
      return <button 
                key={idx}
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)}
              >
                {ltr}
              </button>
            });
  }

  /** render: render game */
  render() {
    console.log(this.state.answer);
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`}/>
        <p className="Hangman-wrongs">Number Wrong : {this.state.nWrong}</p>
        {(this.state.nWrong < this.props.maxWrong) && !this.hasWon() && 
        <div>
          <p className='Hangman-word'>{this.guessedWord()}</p>
          <p className='Hangman-btns'>{this.generateButtons()}</p>
        </div>
        }
        {(this.state.nWrong >= this.props.maxWrong) && !this.hasWon() && 
        <div>
          <p className='Hangman-word'>{this.state.answer}</p>
          <p>YOU LOSE !!!</p>
        </div>
        }
        { this.hasWon() && 
        <div>
          <p className='Hangman-word'>{this.state.answer}</p>
          <p>Congrats!!You Win</p>
        </div>
        }
        <button id="Hangman-btn-reset" onClick={this.reset}>Reset</button>
        
      </div>
    );
  }
}

export default Hangman;
