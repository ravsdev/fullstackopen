import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () =>{
    const dispatch = useDispatch()

    const handleChange = (event) =>{
        const text = event.target.value
        dispatch(setFilter(text))
        //console.log(event.target.value)
    }

    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            <label>
                Filter <input onChange={handleChange}/>
            </label>
        </div>
    )
}

export default Filter