import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/").then((response) => {
      response.data.map(function(value){
        setItems(preValue=>{
          return [...preValue,value.name];
        })     
      })
    })
  },[]);
  
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      axios.post('http://localhost:7000/', {
        name: inputText
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      return [...prevItems, inputText];
    });
    setInputText("");
  }
  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
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
        {items.map((todoItem, index) => (
          <TodoItem
            key={index}
            id={index}
            item={todoItem}
            onChecked={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
