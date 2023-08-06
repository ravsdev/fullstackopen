import Part from "./Part"

const Content = ({parts}) =>{
    //const {name} = parts;
    return (
    <ul style={{listStyle: 'none', padding: '0'}}>
       {
        parts.map(({id,name,exercises})=><Part key={id} name={name} exercises={exercises}/>)
       }
    </ul>
    )
}

export default Content