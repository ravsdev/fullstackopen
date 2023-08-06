const Total = ({parts}) =>{
    const total = parts.reduce((acc,part)=>acc+part.exercises,0)
    return (
    <div>
        <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
    </div>
    )
}

export default Total