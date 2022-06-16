import People from "./People";

const Phonebook = ({add, newName, handleChange, handleNumber, newNumber, persons, del }) => {
    return(
        <div>
    <h2>Phonebook</h2>
      
    <h1> add a new </h1>
    <form onSubmit={add}>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        {" "}
        number:
        <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ul>
      {persons.map((person) => (
        <People del={del} key={person.id} person={person} />
      ))}
    </ul>
    </div>
    )
}

export default Phonebook