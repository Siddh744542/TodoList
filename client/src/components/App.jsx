import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const Server="https://todolist-server-lv8y.onrender.com/"
  useEffect(() => {
    axios.get(Server).then((response) => {
      setItems(response.data);
    })
  },[]);
  
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
      axios.post(Server, {
        name: inputText
      })
      .then(function (response) {
        setItems((prevItems) => {
        console.log(response);
        return [...prevItems,{name:inputText,_id:response.data._id}];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setInputText("");
  }
  function deleteItem(id) {
    axios.delete(Server,{data:{idd:id}})
    .then(response => console.log(response));
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return item._id !== id;
      });
    });
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <ul>
        {items.map((todoItem) => (
          <TodoItem
            key={todoItem._id}
            id={todoItem._id}
            item={todoItem.name}
            onChecked={deleteItem}
          />
        )).reverse()}
      </ul>
    </div>
  );
}

export default App;
