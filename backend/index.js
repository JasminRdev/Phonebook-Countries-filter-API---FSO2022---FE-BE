require('dotenv').config()

const Person = require('./models/person')

const express = require('express')
const req = require('express/lib/request')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('data', (req, res) => {
  const {
    body
  } = req

  return JSON.stringify(body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)



app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)


let persons = [{
  'id': 1,
  'name': 'Arto Hellas',
  'number': '040-123456'
},
{
  'id': 2,
  'name': 'Ada Lovelace',
  'number': '39-44-5323523'
},
{
  'id': 3,
  'name': 'Dan Abramov',
  'number': '12-43-234345'
},
{
  'id': 4,
  'name': 'Mary Poppendieck',
  'number': '39-23-6423122'
}
]

//get

app.get('/', function (req, res) {
  res.send('Hello')
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})


app.get('/info', (request, response) => {
  const text = persons.length
  response.send('Phonebook has info of ' + text + ' people. ' +
        new Date())
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



//post
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0

  return maxId + 1
}



app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.number === undefined || body.name === undefined) {
    return response.status(400).json({
      error: 'Name or number missing.'
    })
  } else {

    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
      .catch(error => next(error))
  }
})




//delete
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})





const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
    }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})