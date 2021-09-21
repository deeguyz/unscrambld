import './App.css';
import React, {useState, useEffect} from 'react';
import scramble from './scramble';
import Answer from './answer';

function App() {

  const [counter, setCounter] = useState(1);
  const [word, setWord] = useState("");
  const [wordString, setWordString] = useState([]);
  const [wordCounter, setWordCounter] = useState(0);
  const [win, setWin] = useState(false);
  const [score, setSCore] = useState(0);

  useEffect( () => {
    if(counter < 11) {
      async function fetchData(){
        const result = await fetch("https://api.hatchways.io/assessment/sentences/" + counter )
        const json = await result.json();
        setWord(json.data.sentence)
      }
  
      fetchData();
      console.log("word: " + word);
      let wordList = [];
      if(word.length !== 0) {
        wordList = word.split(" ");
        for(let i = 0; i < wordList.length; i++) {
          wordList[i] = scramble(wordList[i]);
        }
        setWordString(wordList.join(" "));
      }
    }
  }, [setCounter, counter, word, setWordString]);

  let incrementCounter = () => {
    setCounter(counter + 1);
    setWordCounter(0);
    setWord("");
    setSCore(score +1);

    if(counter === 10){
      setWin(true);
    }
  }
  
  let box = word.split('').map( char => {
    return (
      <Answer char={char} wordCounter={wordCounter} setWordCounter={setWordCounter}></Answer> 
    )
  })

  return (
    <div className="mainContainer" id="scrambled-word">
      <div className="container">
        <p className="scrambledWord">
          {wordString}
        </p>
        <br/>
        <p>
          Guess the Sentence! Start Typing
          <br/>
          <br/>
          The yellow boxes are meant for spaces
          <br/>
          <br/>
          <b>Score: {score}</b>
        </p>
        <br/>
        <div className="boxGroup">
          {box}
        </div>

        {(wordCounter === word.length) && (score < 10) && (<button onClick={incrementCounter}>Next</button>)}
        {win && (<p>You Win!</p>)}
      </div>
    </div>
  );
}

export default App;
