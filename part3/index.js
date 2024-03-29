require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
// app.use(morgan('tiny'))

morgan.token('postData', (req, res) => { 
  if (req.method === 'POST' && req.body) {
    return JSON.stringify(req.body);
  } else {
    return ''
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


let persons = [
    {
        id: 1,
        name: "Ada Lovelace",
        number: "040 123 4567"
      },
      {
        id: 2,
        name: "Dan Abramov",
        number: "030 3434 4433"
      },
      {
        id: 3,
        name: "Mary Poppendick",
        number: "0340 33 5544"
      }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  // const personsAmount = persons.length;
  // 3.18
  Person.countDocuments({})
    .then(count => {
      const date = new Date();
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    })
})

// 3.3 Get person with id
app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)

  // 3.14
  Person.findById(request.params.id)
    .then(person => {
      // 3.15
      if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
    })
    .catch(error => next(error)
      // console.log(error)
      // response.status(400).send({error: 'malformatted id'})
     )
})

// 3.4 Delete person
app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()

  // 3.15
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// 3.5 Generate unique ID
const generateId = () => {
  // const maxId = persons.length > 0
  //   ? Math.max(...persons.map(p => p.id))
  //   : 0
  // return maxId + 1
  const id = Math.floor(Math.random() * 9999)

  return id
}

// 3.6 Check if name exists
const nameExists = (name) => {
  for (let person of persons) {
    if(person.name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
  }
}

// 3.5 Add name
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(nameExists(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  // const person = {
  //     id: generateId(),
  //     name: body.name,
  //     number: body.number
  // }

  // persons = persons.concat(person)

  // response.json(person)

  // 3.14
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// 3.17
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
  
})

// 3.16
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)