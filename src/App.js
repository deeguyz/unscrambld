import './App.css';
import React, {useState, useEffect} from 'react';
import scramble from './scramble';
import Answer from './answer';

function App() {

  const [counter, setCounter] = useState(1);
  const [word, setWord] = useState("");
  const [wordString, setWordString] = useState([]);
  const [wordCounter, setWordCounter] = useState(0);

  useEffect( () => {
    async function fetchData(){
      const result = await fetch("https://api.hatchways.io/assessment/sentences/" + counter )
      const json = await result.json();
      // console.log(json.data.sentence);
      setWord(json.data.sentence)
    }

    fetchData();
    console.log("word: " + word);
    let wordList = [];
    if(word.length !== 0) {
      wordList = word.split(" ");
      for(let i = 0; i < wordList.length; i++) {
        // console.log(wordList[i]);
        wordList[i] = scramble(wordList[i]);
      }
      setWordString(wordList.join(" "));
    }
    
    // console.log(wordList, wordString);
  }, [setCounter, counter, word, setWordString]);

  let incrementCounter = () => {
    setCounter(counter + 1);
    setWordCounter(0);
    setWord("");
  }

  console.log(word)
  
  let box = word.split('').map( char => {
    return (
      <Answer char={char} wordCounter={wordCounter} setWordCounter={setWordCounter}></Answer> 
    )
  })

  console.log(wordCounter);

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
        </p>
        {word}
        <br/>
        <div className="boxGroup">
          {box}
        </div>

        {wordCounter === word.length && (<button onClick={incrementCounter}>con di</button>)}
        
      </div>
    </div>
  );
}

export default App;
