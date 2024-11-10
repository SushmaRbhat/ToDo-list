import React from "react";
import {
  MdCheck,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdModeEditOutline,
  MdOutlineCheckBox,
} from "react-icons/md";

const TodoItem = ({
  item,
  handleEdit,
  handleDelete,
  handleComplete,
  handleDragaStart,
  handleDragOver,
  handleDrop,
}) => {
  const { title, isComplete } = item;
  return (
    <div
      className="todo-item"
      draggable
      onDragStart={handleDragaStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="task">
        <button className="check-btn" onClick={() => handleComplete(item.id)}>
          {!isComplete ? <MdCheckBoxOutlineBlank /> : <MdOutlineCheckBox />}
        </button>

        <span className={isComplete ? "completed" : ""}>{title}</span>
      </div>
      <div>
        <button className="action-btn" onClick={() => handleEdit(item)}>
          <MdModeEditOutline />
        </button>
        <button className="action-btn" onClick={() => handleDelete(item.id)}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
