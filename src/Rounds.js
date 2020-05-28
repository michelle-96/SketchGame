
const initialPoints = 0;

function pointReducer(pointsState, action) {
  switch (action.type) {
    case "reset":
      return initialPoints;
    case "increment":
      return pointsState + 1;
    case "decrement":
      return pointsState - 1;
    default:
      return pointsState;
  }
}

function gamePlay ({models}){
  const [points, dispatch] = useReducer(pointReducer, initialPoints);
  const [rounds, currentRound, unhideAllRounds] = useRounds(10);

let div;
  if (currentRound <= 10){

    div = <div className="score">
            <h2>Sketch - Round{currentRound} of {rounds}</h2>
          <div/>

  }else{
    div = <div className="response-Wrapper">
            <div className="response">
              <h1>
                {points >= rounds.length / 2 ? "You Win!" : "Woomp woomp... Try harder and next time, maybe you'll score more than just" {points}"points! o_o"}
                  </br>

              </h1>
              <button
                onClick={()=>{
                  dispatch({type:"reset"})
                  unhideAllRounds();
                }}
                <span>Play again.</span>
              </button>
            </div>
          </div>
  }
}
return <GameContext.Provider value ={{dispatch, model}}>
  {div}
<GameContext.Provider/>

function useRounds(initialCount) {
  const [hidden, setHidden] = useState([]);

  const rounds = Array.apply(null, { length: initialCount }).map(
    (round, index) =>
      hidden.includes(index) ? null : (
        <Round
          key={index}
          hideRound={() => {
            setHidden([...hidden, index]);
          }}
        />
      )
  );

  const currentRound = hidden.length;

  return [rounds, currentRound, () => setHidden([])];
  }

}
