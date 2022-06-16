import {useState, useEffect} from "react"
import axios from 'axios'
import Country from './component/Country'
import Phonebook from './component/Phonebook'
import personService from './service/person'
import Notification from './component/Notification'

import './styles.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [messageStatus, setNewMessageStatus] = useState(null);


  
  const [inputCountries, setInputCountries] = useState("");
  const [countries, setCountries] = useState([]);


 /**
  *  get with axios
  */

useEffect(() => {
    axios
      .get('/api/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled2' )
        setCountries(response.data)
      })
  }, [])


// useEffect(() => {
//   const results = countries.filter(o => o.name.common.includes(inputCountries));
//   console.log(inputCountries, results);
//   console.log("test")
//   setCountries(results)
//   console.log(countries)
// }, [inputCountries]);



  const add = (event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber
    };


     /**
  *  post/create with axios
  */

const addPerson = personService
 .create(newObject)
 .then(returnedPersons => {
   setNewMessageStatus("Successfully added "+ newObject.name)

   setTimeout(() => {setNewMessageStatus(null)}, 5000);
   
   setPersons(persons.concat(returnedPersons));
   setNewName("")
   setNewNumber("")
 })
 .catch(error => {
  setNewMessageStatus("Sorry Error: Your input is shorter than the minimum allowed length (5)" )
setTimeout(() => {
  setNewMessageStatus(null)
}, 5000);
console.log(error.response.data)
 
})


    function userExists() {
      return persons.some(function (nameCheck) {
        return nameCheck.name === newObject.name;
      });
    }

    const check = userExists(newObject)
      ? alert("Oops! " + newName + " is already decleared")
      : addPerson();

    console.log(userExists(newObject));
    console.log(check);
  };




 /**
  *  delete with axios
  */

  const del = (id) => {
    if (window.confirm('Are you sure you want to delete?')){
    axios.delete("/api/persons/"+id)
    .then(response => {
      if(response.data != null){
        console.log("Item deleted")
        setPersons(persons.filter(o => o.id !== id));
      }
    });
   }
  }



  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

    
  const handleCountries = (event) => {
    setInputCountries(event.target.value);
  }


  return (
    <div>
    <Notification message={messageStatus} />
   <Phonebook del={del} add={add} newName={newName} handleChange={handleChange} handleNumber={handleNumber} newNumber={newNumber} persons={persons}/>

    <Country inputCountries={inputCountries} handleCountries={handleCountries} countries={countries}/>
    </div>
  );
};

export default App;
