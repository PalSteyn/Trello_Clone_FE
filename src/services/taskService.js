import { getCookie } from "../utils/helper";
import { jwtDecode } from "jwt-decode";

const token = getCookie("token") || ""; // Get token from cookie or localStorage
const API_URL = process.env.REACT_APP_API_URL; // Global base URL for API

const getTasksByUserId = async (userId) => {
  try {
    console.log("userId in service", userId);
    const response = await fetch(`${API_URL}/tasks/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching tasks for user ${userId}`);
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const addTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error adding task");
    }

    const addedTask = await response.json();
    return addedTask;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

const updateTask = async (taskId, task) => {
  try {
    console.log("taskId in update service", taskId);
    console.log("task in update service", task);
    const response = await fetch(`${API_URL}/updatetask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error updating task");
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const updateTaskStatus = async (taskId, task) => {
  try {
    const response = await fetch(`${API_URL}/updateTaskStatus/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
      body: JSON.stringify({ status: task }),
    });

    if (!response.ok) {
      throw new Error("Error updating task");
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/deletetask/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting task");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export { getTasksByUserId, addTask, updateTask, deleteTask, updateTaskStatus };
