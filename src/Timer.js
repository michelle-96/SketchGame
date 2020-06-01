import React, { useEffect, useState } from "react";

export function Timer(props) {
  const [startTime] = useState(+new Date());
  const [counter, setCounter] = useState(props.timeSeconds);

  useEffect(() => {
    if (counter <= 0) {
      return;
    }
    const interval = setInterval(() => {
      const diff = Math.floor((+new Date() - startTime) / 1000);
      const newCounter = props.timeSeconds - diff;
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
      {props.children(counter)}
    </div>
  );
}
