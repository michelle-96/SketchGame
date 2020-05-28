import React, { useEffect, useState } from "react";
import "./styles.css";

const COUNTER_TIME_SECONDS = 20;

export default function Timer() {
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
      <h2>Du hast noch {counter} Sekunden Zeit!</h2>
    </div>
  );
}
