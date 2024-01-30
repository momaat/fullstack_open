const Persons = (props) => {

    return (
        <ul>
            {props.filteredPersons.map(person =>
            <li key={person.name}>
                {person.name} {person.number} 
                <button onClick={() => confirm(`Delete ${person.name}?`) ? props.deletePerson(person.id) : ""}>delete</button>
            </li>
            )}  
        </ul>
    )
}

export default Persons
    
    