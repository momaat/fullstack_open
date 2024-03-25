const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://monicatuominen:${password}@cluster0.cub7byj.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
    // If only password is provided, print all names and numbers
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
          console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
      })
} else if (process.argv.length === 5) {
    // If name and number is provided, add them to database
    person.save().then(result => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Invalid number of arguments')
    mongoose.connection.close()
}

