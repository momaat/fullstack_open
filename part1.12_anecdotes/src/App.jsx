import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>
        {props.text}
        </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))
  const [mostVotes, setMostVotes] = useState(0);

  const changeAnecdote = () => {
    return(
      setSelected(Math.floor(Math.random() * 8))
    )
  }

  const indexOfMax = (arr) => {
    return arr.reduce((maxIndex, elem, i, arr) =>
        elem > arr[maxIndex] ? i : maxIndex, 0);
  }


  const addVotes = () => {
    const copyPoints = [...points]
    copyPoints[selected] +=1
    setPoints(copyPoints)

    
    let maxIndex = 0
    let max = copyPoints[0]

    for (let i = 0; i < copyPoints.length; i++) {
      if(copyPoints[i] > max) {
        maxIndex = i;
        max = copyPoints[i]
      }
    }
    setMostVotes(maxIndex)
    
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button handleClick={addVotes} text="vote"/>
      <Button handleClick={changeAnecdote} text="Next anecdote"/>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotes]}
      <p>has {points[mostVotes]} votes</p>
    </div>
  )
}

export default App