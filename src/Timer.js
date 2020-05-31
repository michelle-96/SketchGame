import React, { useEffect, useState } from "react";

import {prediction, setPrediction} from "./App.js"


const COUNTER_TIME_SECONDS = 20;

/*const RoundContext = React.createContext({});*/

export function CurrentRound(props){
  //const randomWord = useRandomLabels();
  const [randomIndex, nextRandomIndex, count]=useRandomIndex(props.labels.length);
  if(randomIndex === undefined){
    return(
      <h3>Spiel fertig</h3>
    );
  }
  const label = props.labels[randomIndex];
  return(
    <div className="flex-wrapper">
        <h2>Runde {count} von {props.labels.length}</h2>
        <Timer key={randomIndex} label={label}/>
        
        <button onClick= {nextRandomIndex}>Next Round</button>
    </div>
  );
}
function shuffle(arr) {
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}

function useRandomIndex(length){

  const [indexes, setIndexes] = useState(new Array(length));

  if(indexes.length > 0 && indexes[0] === undefined){
    for(let i = 0; i < length; i++){
      indexes[i] = i;
    }
    shuffle(indexes);
  }

  const randomIndex = indexes[0];

  function nextRandomIndex() {
    setIndexes(indexes.slice(1));
  }

  const count = length - indexes.length + 1;

  return [randomIndex, nextRandomIndex, count];
}



export function Timer(props) {
  const [startTime] = useState(+new Date());
  const [counter, setCounter] = useState(COUNTER_TIME_SECONDS);

  useEffect(() => {
    if (counter <= 0) {
      return;
    }
    const interval = setInterval(() => {
      const diff = Math.floor((+new Date() - startTime) / 1000);
      const newCounter = COUNTER_TIME_SECONDS - diff;
      if (newCounter !== counter) {
        setCounter(newCounter);
      }
    }, 100);
    return clearInterval.bind(null, interval);
  });

  if (counter <= 0) {
    return <h2 className="App">Zeit vorbei</h2>;
  }

  return (
    <div className="App">
      <h1>Hallo</h1>
      <h2>Du hast noch {counter} Sekunden Zeit um eine {props.label} zu zeichnen</h2>
    </div>
  );
}

//export default Round;
//export {RoundContext};
