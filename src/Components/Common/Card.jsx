import React from "react";
import styles from "./Card.module.css";
import { deleteTask } from "../../services/taskService";

const Card = ({
  task,
  index,
  setViewTask,
  setEditTask,
  setTask,
  fetchTasks,
}) => {
  const handleDelete = async () => {
    // fetch userId from cookies or local storage
    // let userId;
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmation) return;

    try {
      await deleteTask(task.id);
      alert("Task deleted successfully.");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className={styles.card} draggable="true">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
      <div className={styles.actions}>
        <button className={styles.delete} onClick={handleDelete}>
          Delete
        </button>
        <button
          className={styles.edit}
          onClick={() => {
            setEditTask(true);
            setTask(task);
          }}
        >
          Edit
        </button>
        <button
          className={styles.viewDetails}
          onClick={() => {
            setViewTask(true);
            setTask(task);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
