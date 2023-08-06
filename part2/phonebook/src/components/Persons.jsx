import Person from "./Person"

const Persons = ({persons,handleClickRemove}) =>{
    return (
        <div>
        <table>
        <tbody>
          {persons.map(({ id, name, number }) => 
            <Person key={name} id={id} name={name} number={number} handleClickRemove={handleClickRemove}/>
          )}
        </tbody>
      </table>
      </div>
    )
}

export default Persons