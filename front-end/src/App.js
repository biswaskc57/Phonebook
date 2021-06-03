import "./App.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Notification from "./Components/Notification";

import axios from "axios";
import useService from "./Components/services/persons";

const App = (props) => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    useService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response);
    });
  }, []);
  console.log("render", persons.length, "notes");

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [addMessage, setAddMessage] = useState(null);

  const nameHandler = (event) => setNewName(event.target.value);

  const numberHandler = (event) => setNewPhoneNumber(event.target.value);

  const filterHandler = (event) => setFilter(event.target.value);

  console.log(newPhoneNumber);
  console.log(newName);

  const deletePersonOf = (id, name) => {
    let confirms = window.confirm("Press ok to delete  " + name);
    confirms === true
      ? useService.deletePersons(id).then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
      : alert(name + "was not deleted");
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };
    const checkName = persons.map((allname, index) => {
      console.log(persons);
      console.log(allname);
      return allname.name;
    });

    if (!checkName.includes(newName) && newName !== "") {
      useService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response));
          setAddMessage(`Added ${newName}`);
          setTimeout(() => {
            setAddMessage(null);
            console.log(setAddMessage);
          }, 5000);

          console.log(response);
        })
        .catch((error) => {
          // this is the way to access the error message
          setErrorMessage(error.response.data.error);

          setTimeout(() => {
            setErrorMessage(null);
            console.log(error.response.data.error);
          }, 5000);
        });
    } else if (checkName.includes(newName)) {
      let confirms = window.confirm(
        "Do you want to change the phone number of " + newName + " ?"
      );

      if (confirms === true) {
        const newPerson = persons.filter(
          (person) => person.name === newName
        )[0];

        //duplicate object with same id created with the new phone number
        const changedPerson = { ...newPerson, number: newPhoneNumber };

        //id of the object to be update
        const toUpdateId = newPerson.id;

        useService
          .update(toUpdateId, changedPerson)
          .then((response) => {
            console.log(response);
            setPersons(
              persons.map((person) =>
                person.id !== toUpdateId ? person : response
              )
            );
            setErrorMessage(` ${newName}'s phone number updated`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            console.log(persons);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of '${changedPerson.name}' has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
              console.log(errorMessage);
            }, 5000);
            setPersons(persons.filter((n) => n.id !== toUpdateId));
          });
      } else alert("something went wrong");
    }
  };
  console.log(persons);
  console.log(errorMessage);
  return (
    <div style={{ margin: "auto" }}>
      <h1>Phonebook:</h1>
      <Notification message={errorMessage} addMessage={addMessage} />
      <Filter handler={filterHandler} />
      <h1>Add a new:</h1>
      <PersonForm
        persons={persons}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
        addPerson={addPerson}
      />
      <h1>Persons and Numbers:</h1>
      <ul className="persons">
        {persons
          .filter((name) => name.name.toLowerCase().includes(filter))
          .map((open, i) => (
            <Persons
              key={i}
              person={open}
              deletePerson={() => deletePersonOf(open.id, open.name)}
            />
          ))}
      </ul>

      <div></div>
    </div>
  );
};

export default App;
