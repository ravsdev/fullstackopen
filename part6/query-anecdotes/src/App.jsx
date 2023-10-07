import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './request'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    //retry: false,
    refetchOnWindowFocus: false
  })
  
  const addVote = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote)=>{
      const anecdotes = queryClient.getQueryData({queryKey: ['anecdotes']})
      queryClient.setQueryData({queryKey: ['anecdotes']}, anecdotes.map(anecdote=>anecdote.id !== updatedAnecdote.id ? anecdote:updatedAnecdote))
    }
  })

  if(result.isLoading){
    return <div>loading data...</div>
  }

  if(result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    
    addVote.mutate({
      ...anecdote,
      votes: anecdote.votes+1
    })
    dispatch({type: 'SHOW', payload: `anecdote ${anecdote.content} voted`})    
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
