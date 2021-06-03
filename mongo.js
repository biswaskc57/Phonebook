const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Biswas123:${password}@cluster0.mq8ta.mongodb.net/persondb?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

/*
person.save().then((result) => {
  console.log("added " + person.name + " number " + person.number);
  mongoose.connection.close();
});*/

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
