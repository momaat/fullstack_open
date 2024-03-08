const express = require('express')
const app = express()

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

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)