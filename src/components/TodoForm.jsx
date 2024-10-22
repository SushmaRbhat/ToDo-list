import React, { useEffect, useState } from "react";

const TodoForm = ({ addToDo, updateToDo, edit }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (edit) {
      setInputValue(edit.title);
    } else {
      setInputValue("");
    }
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    if (edit) {
      updateToDo(inputValue);
    } else {
      addToDo(inputValue);
    }
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="submit-button" type="submit">
        {edit ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
