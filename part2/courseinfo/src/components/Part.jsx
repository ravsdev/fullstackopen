const Part = (props) =>{
    const {name,exercises} = props;
    return (
       <li style={{margin: '0', marginBottom: '1rem'}}>{name} {exercises}</li>
    )
}

export default Part