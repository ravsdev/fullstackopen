//import { useParams } from "react-router-dom"

const Anecdote = ({anecdote})=>{
    //const id = useParams().id

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div>Has {anecdote.votes} votes</div>
            <div>For more info see <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote