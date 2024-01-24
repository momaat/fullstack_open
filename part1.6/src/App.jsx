import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  if((props.good+props.neutral+props.bad) === 0) {
    return(
      <>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}%</p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }

  const average = () => {
    if ((good+neutral+bad) === 0) {
      return(
        "-"
      ) 
    } 

    return (
       ((good*1)+(neutral*0)+(bad*-1)) / (good+neutral+bad)
    )
  }

  const positive = () => {
    if ((good+neutral+bad) === 0) {
      return(
        "-"
      ) 
    } 

    return (
      good/(good+neutral+bad) * 100
    )
  }

  return (

    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h2>Statistics</h2>
      <Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
        average = {average()}
        positive = {positive()}
      />
    </div>
  )
}

export default App
