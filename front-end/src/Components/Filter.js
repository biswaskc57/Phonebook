import React from "react";

const Filter = (props) => {
  console.log(props.handler);

  return (
    <div>
      <p>
        {" "}
        Filter: <input onChange={props.handler} value={props.value} />
      </p>
    </div>
  );
};

export default Filter;
