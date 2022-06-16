

const People = ({ person, del}) => {



  return (

    <li key={person.id}>
      {person.name} {person.number} 
      <button onClick={() => {del(person.id)}}>Delete</button>
    </li> 

  );
};

export default People;
