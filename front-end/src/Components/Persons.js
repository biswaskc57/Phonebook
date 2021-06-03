import React from "react";

const Persons = (props) => {
  console.log(props.person);

  return (
    <div>
      <li key={props.i}>
        {props.person.name}: {props.person.number}
        <button onClick={props.deletePerson}>delete</button>
      </li>
    </div>
  );
};

export default Persons;
