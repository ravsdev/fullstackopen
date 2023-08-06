import { useState, useEffect } from 'react'


const Header = ({text})=>{
  return (
    <h2>{text}</h2>
  )
}

const Button = ({text,handleClick}) =>{
  return (
     <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ({anecdotes,votes}) =>{
  return (
    <>
      <p>{anecdotes}</p>
      <p>has {votes}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const initVotes = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)
  const [mostVoted, setMostVoted] = useState('No votes yet')
  //const mostVoted = votes.indexOf(Math.max(...votes));

  useEffect(() => {
    setMostVoted(votes.indexOf(Math.max(...votes)))
  }, [votes])
  
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 5));
  }

  const voteAnecdote = () =>{
    const copy = [...votes]
    copy[selected]+=1;
    setVotes(copy)
  }

  return (
    <div>     
      <Header text="Anecdote of the day"/>
      <Anecdote anecdotes={anecdotes[selected]} votes = {votes[selected]}/>
      <Button text="Vote" handleClick={voteAnecdote}/>
      <Button text="Next anecdote" handleClick={randomAnecdote}/>
      
      <Header text="Anecdote with most votes"/>
      <Anecdote anecdotes={anecdotes[mostVoted]} votes = {votes[mostVoted]}/>
    </div>
    
  )
}

export default App