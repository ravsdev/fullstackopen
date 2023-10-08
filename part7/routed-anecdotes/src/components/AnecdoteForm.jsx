import { useField } from "../hooks"

const AnecdoteForm = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
   
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      }) 
    }
    
    const handleReset = () =>{
      content.onReset()
      author.onReset()
      info.onReset()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            Content: 
            <input {...content} />
          </div>
          <div>
            Author: 
            <input {...author} />
          </div>
          <div>
            URL for more info: 
            <input {...info} />
          </div>
          <button>Create</button>
          <input type='reset' value='Reset'/>
        </form>
      </div>
    )
  
  }

  export default AnecdoteForm