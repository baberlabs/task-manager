import React, { useState, useEffect, useRef } from "react";

import iconDelete from "./assets/icons/delete.svg";
import iconDone from "./assets/icons/done.svg";
import iconUndo from "./assets/icons/undo.svg";
import iconEdit from "./assets/icons/edit.svg";
import iconExit from "./assets/icons/exit.svg";
import iconExit2 from "./assets/icons/exit_2.svg";
import iconSave from "./assets/icons/save.svg";
import iconMenu from "./assets/icons/menu.svg";

const ICONS = {
  delete: iconDelete,
  done: iconDone,
  undo: iconUndo,
  edit: iconEdit,
  close: iconExit,
  exit: iconExit2,
  save: iconSave,
  menu: iconMenu,
};

function App() {
  const currentItems = JSON.parse(localStorage.getItem("currentItems")) || [];
  const currentCompletedItems =
    JSON.parse(localStorage.getItem("currentCompletedItems")) || [];
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(currentItems);
  const [completedItems, setCompletedItems] = useState(currentCompletedItems);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeCompletedMenuIndex, setActiveCompletedMenuIndex] =
    useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const editRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("currentItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(
      "currentCompletedItems",
      JSON.stringify(completedItems),
    );
  }, [completedItems]);

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleInputKeyUp = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      addNewItem();
    }
  };

  const handleButtonAdd = () => {
    if (inputValue.trim()) {
      addNewItem();
    }
  };

  const uniqueIndex = () => {
    const date = new Date();
    return `${date.getTime()}`;
  };

  const addNewItem = () => {
    const uniqueId = uniqueIndex();
    setItems([...items, [uniqueId, inputValue]]);
    setInputValue("");
  };

  const handleMenuToggle = (index, type) => {
    if (type === "todo")
      setActiveMenuIndex(activeMenuIndex === index ? null : index);
    if (type === "completed")
      setActiveCompletedMenuIndex(
        activeCompletedMenuIndex === index ? null : index,
      );
  };

  const handleTaskDone = (item, index) => {
    const updatedItems = items.filter((item) => item[0] !== index);
    setItems(updatedItems);
    const uniqueId = uniqueIndex();
    setCompletedItems([...completedItems, [uniqueId, item]]);
    setActiveMenuIndex(null);
  };

  const handleTaskUndone = (item, index) => {
    const updatedItems = completedItems.filter((item) => item[0] !== index);
    setCompletedItems(updatedItems);
    const uniqueId = uniqueIndex();
    setItems([...items, [uniqueId, item]]);
    setActiveCompletedMenuIndex(null);
  };

  const handleEdit = (index, type) => {
    setEditIndex(index);
    let editItem;
    if (type === "todo") {
      editItem = items.find((item) => item[0] === index);
      setActiveMenuIndex(null);
    }
    if (type === "completed") {
      editItem = completedItems.find((item) => item[0] === index);
      setActiveCompletedMenuIndex(null);
    }
    setEditValue(editItem[1]);
  };

  const handleSaveEdit = (index, type) => {
    let updatedItems;
    if (type === "todo") {
      updatedItems = items.map((item) =>
        item[0] === index ? [index, editRef.current.innerText] : item,
      );
      setItems(updatedItems);
    }
    if (type === "completed") {
      updatedItems = completedItems.map((item) =>
        item[0] === index ? [index, editRef.current.innerText] : item,
      );
      setCompletedItems(updatedItems);
    }

    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (index, type) => {
    let updatedItems;

    if (type === "todo") {
      updatedItems = items.filter((item) => item[0] !== index);
      setItems(updatedItems);
      setActiveMenuIndex(null);
    }
    if (type === "completed") {
      updatedItems = completedItems.filter((item) => item[0] !== index);
      setCompletedItems(updatedItems);
      setActiveCompletedMenuIndex(null);
    }
  };

  const TaskItem = ({
    item,
    index,
    menuToggleHandler,
    activeMenuIndex,
    handleTaskDone,
    handleEdit,
    handleDelete,
    type,
  }) => (
    <li key={index} className="flex flex-row items-center gap-4">
      {editIndex === index ? (
        <div className="flex w-full flex-row items-center gap-4">
          <span
            contentEditable
            ref={editRef}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-950"
            suppressContentEditableWarning={true}
            aria-label="Editable task"
            onKeyUp={(event) => {
              event.preventDefault();
              if (event.key === "Enter") {
                handleSaveEdit(index, type);
              }
            }}
          >
            {editValue}
          </span>
          <button
            onClick={() => handleSaveEdit(index, type)}
            aria-label="Save task"
          >
            <img src={ICONS.save} alt="Save task" className="h-5" />
          </button>
          <button onClick={() => setEditIndex(null)} aria-label="Cancel edit">
            <img src={ICONS.close} alt="Cancel edit" className="h-5" />
          </button>
        </div>
      ) : (
        <div className="relative flex flex-row items-center gap-4">
          {/* Task Text */}
          {type === "todo" && (
            <div className="flex flex-row items-center gap-4">
              <span className="w-fit rounded-xl border border-gray-300 bg-gray-200 px-4 py-2">
                {item}
              </span>
              <button
                onClick={() => menuToggleHandler(index, type)}
                aria-label="Open menu"
              >
                <img src={ICONS.menu} alt="Open menu" className="w-6 py-2" />
              </button>
            </div>
          )}
          {type === "completed" && (
            <div className="flex flex-row items-center gap-4 opacity-40">
              <span className="w-fit rounded-xl border border-gray-300 bg-gray-200 px-4 py-2">
                {item}
              </span>
              <button
                onClick={() => menuToggleHandler(index, type)}
                aria-label="Open menu"
              >
                <img src={ICONS.menu} alt="Open menu" className="w-6 py-2" />
              </button>
            </div>
          )}

          {activeMenuIndex === index && (
            <div className="absolute right-0 top-10 z-10 flex flex-col gap-6 rounded-xl bg-gray-800 px-6 py-6">
              {/* Task Done */}
              {type === "todo" && (
                <button
                  className="flex w-28 cursor-pointer flex-row items-center gap-3"
                  onClick={() => handleTaskDone(item, index)}
                  aria-label="Mark task as done"
                >
                  <img src={ICONS.done} alt="Mark as done" className="h-5" />
                  <span className="text-blue-400">Done</span>
                </button>
              )}
              {type === "completed" && (
                <button
                  className="flex w-28 cursor-pointer flex-row items-center gap-3"
                  onClick={() => handleTaskUndone(item, index)}
                  aria-label="Mark task as incomplete"
                >
                  <img
                    src={ICONS.undo}
                    alt="Mark as incomplete"
                    className="h-5"
                  />
                  <span className="text-orange-300">Undo</span>
                </button>
              )}
              {/* Edit Task */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => handleEdit(index, type)}
                aria-label="Edit task"
              >
                <img src={ICONS.edit} alt="Edit task" className="h-5" />
                <span className="text-gray-200">Edit</span>
              </button>
              {/* Cancel Menu */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => menuToggleHandler(null)}
                aria-label="Close menu"
              >
                <img src={ICONS.exit} alt="Close menu" className="h-5" />
                <span className="text-gray-200">Cancel</span>
              </button>
              {/* Delete Task */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => handleDelete(index, type)}
                aria-label="Delete task"
              >
                <img src={ICONS.delete} alt="Delete task" className="h-5" />
                <span className="text-red-400">Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-900 p-4 text-sm">
      {/* To Do Tasks */}
      <div className="rounded-xl bg-gray-950 p-4">
        <h2 className="font-black text-gray-400">TODO</h2>
        <ul className="flex h-fit flex-col gap-2  p-5">
          {items.map((itemArray) => (
            <TaskItem
              key={itemArray[0]}
              item={itemArray[1]}
              index={itemArray[0]}
              menuToggleHandler={handleMenuToggle}
              activeMenuIndex={activeMenuIndex}
              handleTaskDone={handleTaskDone}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              type="todo"
            />
          ))}
        </ul>
      </div>
      {/* Completed Tasks */}
      <div className="rounded-xl bg-gray-950 p-4">
        <h2 className="font-black text-gray-400">COMPLETED</h2>
        <ul className="flex h-fit flex-col gap-2  p-5">
          {completedItems.map((itemArray) => (
            <TaskItem
              key={itemArray[0]}
              item={itemArray[1]}
              index={itemArray[0]}
              menuToggleHandler={handleMenuToggle}
              activeMenuIndex={activeCompletedMenuIndex}
              handleTaskUndone={handleTaskUndone}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              type="completed"
            />
          ))}
        </ul>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-5">
        <div className="relative w-full">
          <input
            type="text"
            name="input-add"
            id="input-add"
            className="relative w-full rounded-full px-6 py-3 text-gray-950 outline-none"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleInputKeyUp}
            aria-label="New task input"
          />
          <button
            id="button-add"
            className="absolute right-1 mt-1 h-9 w-9 rounded-full bg-gray-950 text-xl font-black text-gray-200"
            onClick={handleButtonAdd}
            aria-label="Add task"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
