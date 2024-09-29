// components/TaskDetailsModal.jsx
import React from "react";
import styles from "./TasksView.module.css";

const TasksView = ({ task, onClose }) => {
  //   if (!task1) return null; // Don't render the modal if no task is passed

  //   const task = {
  //     id: "task-1",
  //     title: "Task 1",
  //     description: "Description 1",
  //     date: "01/09/2021, 05:30:00",
  //   };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Task Details</h2>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Created at:</strong> {new Date(task.date).toLocaleString()}
        </p>
        <div className={styles.buttons}>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksView;
