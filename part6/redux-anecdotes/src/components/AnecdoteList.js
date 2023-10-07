import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter==='') return state.anecdotes

        return state.anecdotes.filter(({content})=>content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        //console.log('vote', id)
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
      }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
