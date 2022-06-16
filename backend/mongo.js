
const mongoose = require('mongoose')

const password = process.argv[2]
// const newName =  process.argv[3]
// const newNumber =  process.argv[4]

const url =
  `mongodb+srv://jasmin:${password}@cluster0.yqjaf.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: newName,
//     number: newNumber
// })

// person.save().then(result => {
//   console.log('added ' + newName + " number " +newNumber + " to phonebook" )
//   mongoose.connection.close()
// })


// if (process.argv.length === 3) {
//     Person
//     .find({})
//     .then(result => {
//         result.forEach(person => {
//           console.log(person.name + " " + person.number)
//         })
//         mongoose.connection.close()
//       })
// }


