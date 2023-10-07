import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation ({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote)=>{
      const anecdotes = queryClient.getQueryData({queryKey: ['anecdotes']})
      queryClient.setQueryData({queryKey: ['anecdotes']}, anecdotes.concat(newAnecdote))
    },
    onError: ()=>{
      dispatch({type:'SHOW', payload: 'Too short anecdote, must have length 5 or more'})
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({type: 'SHOW', payload: `Anecdote ${content} added`})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
