import React from "react";
const FilterButton = (props) => {
  let classes = ["btn", "toggle - btn"];
  if (props.isPressed) {
    classes.push("active");
  }
  return (
    <button
      type="button"
      className={classes.join(" ")}
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show</span>
      <span>{props.name}</span>
      <span className="visually-hidden">Tasks</span>
    </button>
  );
};

export default FilterButton;
