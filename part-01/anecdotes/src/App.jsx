import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomIndex = max => Math.floor(Math.random() * max);

  const setRandomAnecdote = () => {
    let idx;
    do {
      idx = getRandomIndex(anecdotes.length);
    } while (idx === selected);
    setSelected(idx);
  }

  const voteFor = idx => {
    let newVotes = [...votes]
    newVotes[idx]++;
    setVotes(newVotes);
    console.log("Selected: ", selected);
    console.log("Votes: ", newVotes);
  }

  const getMostVotedIdx = () => {
    let idx;
    let max = -1;
    votes.forEach((vs, i) => {
      if (vs > max) {
        idx = i;
        max = vs;
      }
    })

    return idx;
  }

  return (
    <>
      <h2>Anecdote of the Day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <button onClick={() => voteFor(selected)}>Vote</button>
      <button onClick={setRandomAnecdote}>Next Anecdote</button>

      <h2>Anecdote with the Most Votes</h2>
      <div>
        {anecdotes[getMostVotedIdx()]}
      </div>
    </>
  )
}

export default App