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

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleInputKeyUp(event) {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        setItems([...items, inputValue]);
        setInputValue("");
      }
    }
  }

  function handleButtonAdd() {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  }

  function handleMenuToggle(index) {
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  }

  function handleTaskDone(index) {
    // logic for marking task as done
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditValue(items[index]);
    setActiveMenuIndex(null);
  }

  function handleSaveEdit(index) {
    const updatedItems = [...items];
    updatedItems[index] = editRef.current.innerText;
    setItems(updatedItems);
    setEditIndex(null);
    setEditValue("");
  }

  function handleDelete(index) {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setActiveMenuIndex(null);
  }

  return (
    <div className="text-sm">
      <ul className="flex min-h-screen flex-col gap-2 bg-purple-950 p-5">
        {items.map((item, index) => (
          <li key={index} className="flex flex-row items-center gap-4">
            {editIndex === index ? (
              <div className="flex w-full flex-row items-center gap-4">
                <span
                  contentEditable
                  ref={editRef}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-950"
                  suppressContentEditableWarning={true}
                >
                  {editValue}
                </span>
                <img
                  src={iconSave}
                  alt="Save the edited task icon"
                  className="h-5 cursor-pointer"
                  onClick={() => handleSaveEdit(index)}
                />
                <img
                  src={iconExit}
                  alt="Exit the edit state icon"
                  className="h-5 cursor-pointer"
                  onClick={() => setEditIndex(null)}
                />
              </div>
            ) : (
              <div className="flex flex-row items-center gap-4">
                {/* Task Text */}
                <span className="w-fit rounded-xl border border-gray-300 bg-gray-200 px-4 py-2">
                  {item}
                </span>
                <span className="relative">
                  {/* Open Menu */}
                  <img
                    src={iconSettings}
                    alt="Menu open icon"
                    className="h-5 cursor-pointer"
                    onClick={() => handleMenuToggle(index)}
                  />
                  {activeMenuIndex === index && (
                    <div className="absolute right-0 top-10 flex flex-col gap-6 rounded-xl bg-gray-800 px-6 py-6">
                      {/* Task Done */}
                      <div
                        className="flex w-28 cursor-pointer flex-row items-center gap-3"
                        onClick={() => handleTaskDone(index)}
                      >
                        <img
                          src={iconDone}
                          alt="Task done icon"
                          className="h-5"
                        />
                        <span className="text-blue-400">Done</span>
                      </div>
                      {/* Edit Task */}
                      <div
                        className="flex w-28 cursor-pointer flex-row items-center gap-3"
                        onClick={() => handleEdit(index)}
                      >
                        <img
                          src={iconEdit}
                          alt="Edit task icon"
                          className="h-5"
                        />
                        <span className="text-gray-200">Edit</span>
                      </div>
                      {/* Exit Menu */}
                      <div
                        className="flex w-28 cursor-pointer flex-row items-center gap-3"
                        onClick={() => setActiveMenuIndex(null)}
                      >
                        <img
                          src={iconExit2}
                          alt="Exit menu icon"
                          className="h-5"
                        />
                        <span className="text-gray-200">Exit</span>
                      </div>
                      {/* Delete Task */}
                      <div
                        className="flex w-28 cursor-pointer flex-row items-center gap-3"
                        onClick={() => handleDelete(index)}
                      >
                        <img
                          src={iconDelete}
                          alt="Delete task icon"
                          className="h-5"
                        />
                        <span className="text-red-400">Delete</span>
                      </div>
                    </div>
                  )}
                </span>
              </div>
            )}
          </li>
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
          />
          <button
            id="button-add"
            className="absolute right-1 mt-1 h-9 w-9 rounded-full bg-purple-950 text-xl font-black text-gray-200"
            onClick={handleButtonAdd}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
