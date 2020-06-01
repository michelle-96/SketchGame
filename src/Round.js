import React, { useState } from "react";
import { COUNTER_TIME_SECONDS } from './App';

/*const RoundContext = React.createContext({});*/

export function Round(props){
  //const randomWord = useRandomLabels();
  const [randomIndex, nextRandomIndex, count] = useRandomIndex(props.labels.length);

  if(props.prediction === props.labels[randomIndex]) {
    return <>
        <h1>Gut gemacht, diese Runde geht an dich, das ist wirklich ein {props.prediction}, du erhältst {props.timeLeft/COUNTER_TIME_SECONDS} Punkte</h1>
        <button onClick={() => {
          props.increment(props.timeLeft/COUNTER_TIME_SECONDS)
          nextRandomIndex();
        }}>Next Round</button>
      </>;
  }

  if(randomIndex === undefined){
    return(
      <h3>Spiel fertig</h3>
    );
  }
  const label = props.labels[randomIndex];
  return(
    <div className="flex-wrapper">
        <h2>Runde {count} von {props.labels.length}</h2>      
        <h2>Du hast noch {props.timeLeft} Sekunden Zeit um eine {props.labels[randomIndex]} zu zeichnen</h2>
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
