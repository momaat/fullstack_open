const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)