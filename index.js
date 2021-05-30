const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));

const cors = require("cors");

app.use(cors());
//:body comes from morgan.token("body",...)
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body ")
);

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

app.get("/", (request, response) => {
  response.send("<div>HELLO WORLD</div>");
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

  console.log(generateId());
  const checkName = persons.map((person) => person.name);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (checkName.includes(body.name)) {
    return response.status(200).json({
      error: " name must be unique",
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

  response.status(204).end();
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;

  const person = persons.find((n) => n.id === id);
  const changedPerson = { ...person, number: request.body.number };
  response.json(changedPerson);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
