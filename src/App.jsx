import { useEffect, useState } from "react";
import TenziesDie from "./components/TenziesDie"
import Confetti from "./components/Confetti";

const App = () => {
  const [diesValues, setDiesValues] = useState(diesAndValues())
  const [youWin, setYouWin] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [timer, setTimer] = useState([])
  // let trackedTime = null

  useEffect(() => {
    const heldDie = diesValues.every((die) => die.isHeld);
    const firstDie = diesValues[0]?.value
    const sameValues = diesValues.every((die) => die.value === firstDie)
    if (heldDie === true & sameValues === true) {
      setYouWin(true)
      console.log("you won")
      // const trackedTime = (timer[timer.length - 1] - timer[0] )/ 1000
    }
  }, [diesValues])

  function diesAndValues() {
    const tenzies = [];
    for (let i = 1; i <= 10; i++) {
      tenzies.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
      // tenzies.push(<TenziesDie key={i} number={random} />)\
      // console.log(tenzies)
    }
    return tenzies
  }

  const hold = (id) => {
    setDiesValues((initialDies) => initialDies.map((each, index) => {
      return index === id ? { ...each, isHeld: !each.isHeld } : each
    }))
  }
  function reset() {
    setDiesValues((prev) => prev.map((each) => {
      return { value: Math.ceil(Math.random() * 6), isHeld: false }
    }))
    setYouWin(false);
    setAttempt(0)
    setTimer([])
  }

  const AllDies = diesValues.map((die, index) => <TenziesDie hold={hold} index={index} number={die} key={index} />)
  const scrableDies = () => {
    setDiesValues((initialDies) => initialDies.map((each, index) => {
      return each.isHeld === true ? { ...each } : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }
    }))
    setAttempt( prev => prev + 1)
    setTimer((prev) => [...prev, Date.now()])
  }
  return (
    <div className="bg-dark min_vh pb-4 text-light">
      <h1 className="h1 text-center">Tenzies</h1>
     
      <div className="card my-4 mx-auto tenzies_card">
      <p className="text-center">
        <i><b>Instruction:</b></i> roll until all dies are the same, then click each die to freeze at desire value
      </p>
        <div className="tenzies_container">
          {youWin && (<Confetti />)}
          {AllDies}
        </div>
        <div className="mt-5 w-100">
          <div>
            {youWin && (<p> Congratulations You made <b> {attempt}</b> attempt</p>)}
          </div>
          <div>
            {youWin && (<p>Completed in <b>{(timer[timer.length - 1] - timer[0] )/ 1000} </b> seconds</p>)}
          </div>
          {youWin ? (
            <button
              onClick={reset}
              className="btn w-100 btn-success">Reset</button>
          ) :
            <button onClick={scrableDies} className="btn w-100 btn-success">Roll</button>
          }
        </div>
      </div>
    </div>
  )
}

export default App