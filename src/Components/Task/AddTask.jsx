// components/EditTaskModal.jsx
import React, { useState } from "react";
import styles from "./TasksView.module.css";
import { addTask } from "../../services/taskService";

const AddTask = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    // fetch userId from cookies
    let userId;

    if (title && description) {
      const time = new Date();
      const newTask = { title, description, time };

      try {
        const res = await addTask(userId, newTask);
        console.log("Task added successfully:", res);
        setTitle("");
        setDescription("");
      } catch (err) {
        console.error("Failed to add task:", err);
      }
    } else {
      alert("Please fill in both title and description");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Task</h2>
        <label htmlFor="title" className={styles.label}>
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="description" className={styles.label}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={handleAdd}>
            Add
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
