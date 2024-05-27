import React, { useState, useEffect, useRef } from "react";
import iconAdd from "./assets/icons/add.svg";
import iconDelete from "./assets/icons/delete.svg";
import iconDone from "./assets/icons/done.svg";
import iconEdit from "./assets/icons/edit.svg";
import iconExit from "./assets/icons/exit.svg";
import iconExit2 from "./assets/icons/exit_2.svg";
import iconSave from "./assets/icons/save.svg";
import iconSettings from "./assets/icons/settings.svg";

function App() {
  const currentItems = JSON.parse(localStorage.getItem("currentItems")) || [];
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(currentItems);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const editRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("currentItems", JSON.stringify(items));
  }, [items]);

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

  const addNewItem = () => {
    setItems([...items, inputValue]);
    setInputValue("");
  };

  const handleMenuToggle = (index) =>
    setActiveMenuIndex(activeMenuIndex === index ? null : index);

  const handleTaskDone = (index) => {
    // logic for marking task as done
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
    setActiveMenuIndex(null);
  };

  const handleSaveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = editRef.current.innerText;
    setItems(updatedItems);
    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setActiveMenuIndex(null);
  };

  const TaskItem = ({ item, index }) => (
    <li key={index} className="flex flex-row items-center gap-4">
      {editIndex === index ? (
        <div className="flex w-full flex-row items-center gap-4">
          <span
            contentEditable
            ref={editRef}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-950"
            suppressContentEditableWarning={true}
            aria-label="Editable task"
          >
            {editValue}
          </span>
          <button onClick={() => handleSaveEdit(index)} aria-label="Save task">
            <img src={iconSave} alt="Save task" className="h-5" />
          </button>
          <button onClick={() => setEditIndex(null)} aria-label="Cancel edit">
            <img src={iconExit} alt="Cancel edit" className="h-5" />
          </button>
        </div>
      ) : (
        <div className="relative flex flex-row items-center gap-4">
          {/* Task Text */}
          <span className="w-fit rounded-xl border border-gray-300 bg-gray-200 px-4 py-2">
            {item}
          </span>

          <button
            onClick={() => handleMenuToggle(index)}
            aria-label="Open menu"
          >
            <img src={iconSettings} alt="Open menu" className="h-5" />
          </button>

          {activeMenuIndex === index && (
            <div className="absolute right-0 top-10 z-10 flex flex-col gap-6 rounded-xl bg-gray-800 px-6 py-6">
              {/* Task Done */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => handleTaskDone(index)}
                aria-label="Mark task as done"
              >
                <img src={iconDone} alt="Mark as done" className="h-5" />
                <span className="text-blue-400">Done</span>
              </button>
              {/* Edit Task */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => handleEdit(index)}
                aria-label="Edit task"
              >
                <img src={iconEdit} alt="Edit task" className="h-5" />
                <span className="text-gray-200">Edit</span>
              </button>
              {/* Cancel Menu */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => setActiveMenuIndex(null)}
                aria-label="Close menu"
              >
                <img src={iconExit2} alt="Close menu" className="h-5" />
                <span className="text-gray-200">Cancel</span>
              </button>
              {/* Delete Task */}
              <button
                className="flex w-28 cursor-pointer flex-row items-center gap-3"
                onClick={() => handleDelete(index)}
                aria-label="Delete task"
              >
                <img src={iconDelete} alt="Delete task" className="h-5" />
                <span className="text-red-400">Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );

  return (
    <div className="text-sm">
      <ul className="flex min-h-screen flex-col gap-2 bg-purple-950 p-5">
        {items.map((item, index) => (
          <TaskItem key={index} item={item} index={index} />
        ))}
      </ul>

      <div className="fixed bottom-0 w-full bg-purple-950 p-5">
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
            className="absolute right-1 mt-1 h-9 w-9 rounded-full bg-purple-950 text-xl font-black text-gray-200"
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
