import React, { useState, useRef, useEffect } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const handleChange = (e) => {
    setNewName(e.target.value);
    props.setFilter(newName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName === "") return;
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  };
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}{" "}
          <input
            id={props.id}
            type="text"
            className="todo-text"
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel<span className="visually-hidden">Renaming {props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__primary"
          onClick={handleSubmit}
        >
          Save<span className="visually-hidden">Renaming {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <>
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleCompletedTask(props.id)}
        />
        <label className="todo-label" htmlFor="todo-0">
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </>
  );

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

export default Todo;
