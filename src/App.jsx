import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || []
  );
  const [edit, setEdit] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

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
  const handleDragaStart = (e, i) => {
    console.log("drasta", e, i);
    // setDragIndex(i);
    setDragIndex(i);
  };
  const handleDrop = (e, tagetIndex) => {
    const newItems = [...items];
    const spayload = newItems[dragIndex];
    const tpayload = newItems[tagetIndex];
    if (dragIndex === null) return;
    newItems[tagetIndex] = spayload;
    newItems[dragIndex] = tpayload;
    setItems(newItems);
  };
  ///alternative approach
  const handleDrop1 = (e, tagetIndex) => {
    const newItems = [...items];
    const payload = newItems[dragIndex];
    if (dragIndex === null) return;
    newItems.splice(dragIndex, 1);
    newItems.splice(tagetIndex, 0, payload);
    setItems(newItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>ToDo List</h1>
      <TodoForm addToDo={addToDo} edit={edit} updateToDo={updateToDo} />
      <div className="todo-list">
        {items &&
          items.map((x, idx) => (
            <TodoItem
              key={x?.id}
              item={x}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handleDragaStart={(e) => handleDragaStart(e, idx)}
              handleDrop={(e) => handleDrop(e, idx)}
              handleDragOver={handleDragOver}
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
