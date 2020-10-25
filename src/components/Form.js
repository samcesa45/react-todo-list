import React, { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") return;
    props.addTasks(name);
    setName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs To be done?
        </label>
      </h2>
      <input
        type="text"
        className="input input__lg"
        id="new-todo-input"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
