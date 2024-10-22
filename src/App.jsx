import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || []
  );
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(items));
  }, [items]);

  const addToDo = (value) => {
    setItems((prev) => [
      ...prev,
      { id: new Date().getTime(), title: value, isComplete: false },
    ]);
  };
  const updateToDo = (updatedValue) => {
    setItems((prev) =>
      prev.map((x) => (x.id === edit.id ? { ...x, title: updatedValue } : x))
    );
    setEdit(null);
  };
  const handleEdit = (item) => {
    setEdit(item);
  };
  const handleDelete = (id) => {
    const newList = items.filter((x) => x.id !== id);
    setItems(newList);
  };

  const handleComplete = (id) => {
    const newList = items.map((x) =>
      x.id === id ? { ...x, isComplete: !x.isComplete } : x
    );
    setItems(newList);
  };

  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <TodoForm addToDo={addToDo} edit={edit} updateToDo={updateToDo} />
      <div className="todo-list">
        {items &&
          items.map((x) => (
            <TodoItem
              key={x.id}
              item={x}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
            />
          ))}
      </div>
      <button className="clear-btn" onClick={handleClearAll}>
        Clear all
      </button>
    </>
  );
}

export default App;
