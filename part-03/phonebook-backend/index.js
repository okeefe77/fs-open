const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.static('static'));
app.use(express.json());

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return '';
  }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/info', (req, res) => {
  const reqTime = new Date().toString();

  Person.find({})
    .then(persons => {
      res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${reqTime}</p>`
      );
    })
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

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(result => {
      res.status(200).json({ id });
    })
    .catch(error => next(error))
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

  const newPerson = new Person({
    name,
    number
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson)
    });
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  Person.findById(id)
    .then(person => {
      if (!person) return res.status(404).end();
      person.name = name;
      person.number = number;

      person.save()
        .then(updatedPerson => {
          res.json(updatedPerson);
        })
    })
    .catch(error => next(error));
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID' });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.port || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
});