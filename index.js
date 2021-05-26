const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

app.get("/", (request, response) => {
  response.send(info);
});

const today = new Date();

app.get("/info", (request, response) => {
  response.send(
    "Phonebook has a info for total " +
      persons.length +
      " persons." +
      "<br>" +
      today
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = () => {
  const checkId = persons.map((person) => person.id);

  let randomId = 0;
  do {
    randomId = Math.floor(Math.random() * 100);
  } while (checkId.includes(randomId));
  return randomId;
};

const number = generateId();

app.post("/api/persons", (request, response) => {
  const body = request.body;

  console.log(body);
  console.log(generateId());
  const checkName = persons.map((person) => person.name);
  if (!body.name || !body.number) {
    console.log(body.name);
    return response.status(400).json({
      error: "content missing",
    });
  } else if (checkName.includes(body.name)) {
    return response.status(200).json({
      error: body.name + " is a lready included",
    });
  }

  person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  console.log(request.params);

  const person = persons.find((personal) => personal.id === id);

  if (person === undefined) {
    console.log(id);
    return response.status(400).json({
      error: "id number " + id + " missing",
    });
  } else {
    console.log(person);
    response.json(person);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  console.log(persons);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
