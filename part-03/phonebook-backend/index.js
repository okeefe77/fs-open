const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.json());
app.use(express.static('static'));

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return '';
  }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const genId = () => {
  const MIN = 100000;
  const MAX = 999999;
  return Math.floor(Math.random() * (MAX - MIN) + MIN).toString();
}

const exists = name => persons.some(p => p.name === name);


app.get('/info', (req, res) => {
  const reqTime = new Date().toString();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${reqTime}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findById(id).then(person => {
    res.json(person);
  })
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(p => p.id !== id);
  res.json({ id });
})

app.post('/api/persons', (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  if (!name) {
    return res.status(400).json({
      "error": "name is missing"
    });
  }

  if (!number) {
    return res.status(400).json({
      "error": "number is missing"
    });
  }

  if (exists(name)) {
    return res.status(400).json({
      "error": "person already exists"
    })
  }

  const newPerson = new Person({
    name,
    number
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson)
    });
});

const PORT = process.env.port || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
});