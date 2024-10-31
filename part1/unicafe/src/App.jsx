import { useState } from 'react'

const Button = (props) =>  
  (
    <button onClick={props.onHandle}>{props.text}</button>
  )

  
const StatisticLine = (props) => {
  const {text, value} = props
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}


// a proper place to define a component
const Statistics = (props) => {
  const {good, bad, all, neutral} = props
  const average = () => {
    return (good - bad) / all
  }

  const positive = () => {
    return good / all * 100
  }

  if (all == 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}></StatisticLine>
          <StatisticLine text='neutral' value={neutral}></StatisticLine>
          <StatisticLine text='all' value={all}></StatisticLine>
          <StatisticLine text='bad' value={bad}></StatisticLine>
          <StatisticLine text='average' value={average()}></StatisticLine>
          <StatisticLine text='positive' value={positive()}></StatisticLine>
        </tbody>
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const onNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const onBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onHandle={onGood} text={'good'}></Button>
      <Button onHandle={onNeutral} text={'neutral'}></Button>
      <Button onHandle={onBad} text={'bad'}></Button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} all={all} neutral={neutral}></Statistics>
    </div>
  )
}

export default App