const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to db')
  })
  .catch((error) => {
    console.log('error connecting to db:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: { type: Number }
})

//format object returned by mongoose to modify toJSON
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Person', personSchema)