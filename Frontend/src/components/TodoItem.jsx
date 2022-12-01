import React from "react";

function TodoItem(props) {
  return (
    <div
      onClick={() => {
        props.onChecked(props.id);
      }}>
      <li>{props.item}</li>
    </div>
  );
}
export default TodoItem;
