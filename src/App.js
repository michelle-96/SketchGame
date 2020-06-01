import React, { useState } from "react";
import { Canvas } from './Canvas.js';
import { getPrediction } from "./helpers.js";
import { Round } from "./Round.js";
import { Timer } from './Timer.js';

export const COUNTER_TIME_SECONDS = 20;

export function App({model, labels}) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.
  let [points, setPoints] = useState(0);
  
  let ref = React.createRef();

  function predict() {
    getPrediction(ref, model).then(prediction =>
      setPrediction(labels[prediction[0]])
    )
  }

  function increment(timeLeftFrac) {
    setPoints(points + (10 * timeLeftFrac));
  }

  return (
    <div>
      <h2>Aktuelle Punktzahl: {points}</h2>
      <Canvas onMouseUp={predict} ref={ref} />
      <button
        onClick={() => {
          const canvas = ref.current;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.height, canvas.width);
          setPrediction('');
        }}
      >
        Clear the canvas.
      </button>
      <Timer timeSeconds={COUNTER_TIME_SECONDS}>
        {timeLeft => {
          return <Round timeLeft={timeLeft} increment={increment} prediction={prediction} labels={labels}/>;
        }}
      </Timer>
    </div>
  );
  
}
