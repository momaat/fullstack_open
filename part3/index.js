const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
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
  response.json(persons)
})

app.get('/info', (request, response) => {
  const personsAmount = persons.length;
  const date = new Date();
  
  response.send(`<p>Phonebook has info for ${personsAmount} people</p><p>${date}</p>`)
})

// 3.3 Get person with id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// 3.4 Delete person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
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
const nameExists= (name) => {
  for (let person of persons) {
    if(person.name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
  }
}

// 3.5 Add name
app.post('/api/persons', (request, response) => {
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

  const person = {
      id: generateId(),
      name: body.name,
      number: body.number
  }

  persons = persons.concat(person)

  response.json(person)

})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)