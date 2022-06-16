import axios from 'axios';
const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
   const request = axios.put(`${baseUrl}/${id}`, newObject)
   return request.then(response => response.data)
}


//dont know how to refactor :(

// const deleted = (id) => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//       return request.then(response => {
//         if(response.data != null){
//           console.log("Item deleted")
//           setPersons(persons.filter(o => o.id !== id));
//         }
//       });
//   }
  
  export default { getAll, create, update }