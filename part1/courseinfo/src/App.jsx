import { useState } from 'react'

const Button = (props) =>  
  (
    <button onClick={props.onHandle}>{props.text}</button>
  )


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGood = () => {
    console.log("good value: ", good)
    setGood(good + 1)
    setAll(all + 1)
  }
  const onNeutral = () => {
    console.log("neutral value: ", neutral)
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const onBad = () => {
    console.log("bad value: ", bad)
    setBad(bad + 1)
    setAll(all + 1)
  }

  const average = () => {
    return (good - bad) / all
  }

  const positive = () => {
    return good / all * 100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onHandle={onGood} text={'good'}></Button>
      <Button onHandle={onNeutral} text={'neutral'}></Button>
      <Button onHandle={onBad} text={'bad'}></Button>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average()}</div>
      <div>positive {positive()} %</div>
    </div>
  )
}

export default App