import { useEffect, useState } from "react";
import TenziesDie from "./components/TenziesDie"
import Confetti from "./components/Confetti";

const App = () => {
  const [diesValues, setDiesValues] = useState(diesAndValues())
  const [youWin, setYouWin] = useState(false)

  useEffect(() => {
    const heldDie = diesValues.every((die) => die.isHeld);
    const firstDie = diesValues[0]?.value
    const sameValues = diesValues.every((die) => die.value === firstDie)
    if (heldDie === true & sameValues === true) {
      setYouWin(true)
      console.log("you won")
    }
  }, [diesValues])

  const valuesGenerator = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

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
  }

  const AllDies = diesValues.map((die, index) => <TenziesDie hold={hold} index={index} number={die} key={index} />)
  const scrableDies = () => {
    setDiesValues((initialDies) => initialDies.map((each, index) => {
      return each.isHeld === true ? { ...each } : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      }
    }))
  }

  return (
    <div className="bg-dark pb-4 text-light">
      <h1 className="h1 text-center">Tenzies</h1>
      <div className="card my-4 mx-auto tenzies_card">
        <div className="tenzies_container">
          {youWin && (<Confetti />)}
          {AllDies}
        </div>
        <div className="mt-5 w-100">
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