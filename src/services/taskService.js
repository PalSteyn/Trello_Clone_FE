const API_URL = process.env.REACT_APP_API_URL; // Global base URL for API

const getTasksByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

const addTask = async (userId, task) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

const updateTask = async (userId, taskId, task) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${userId}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

const deleteTask = async (userId, taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${userId}/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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

export { getTasksByUserId, addTask, updateTask, deleteTask };
