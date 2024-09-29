// components/Board.jsx
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../Common/Card";
import styles from "./Board.module.css";
import SearchBar from "../SearchBar/SearchBar";
import TasksView from "../Task/TasksView";
import EditTask from "../Task/EditTask";
import AddTask from "../Task/AddTask";

const initialData = {
  todo: [
    {
      id: "task-1",
      title: "Task 1",
      description: "Description 1",
      date: "01/09/2021, 05:30:00",
    },
    {
      id: "task-2",
      title: "Task 2",
      description: "Description 2",
      date: "01/09/2023, 05:30:00",
    },
    {
      id: "task-3",
      title: "Task 3",
      description: "Description 3",
      date: "01/09/2024, 05:30:00",
    },
  ],
  inProgress: [
    {
      id: "task-4",
      title: "Task 4",
      description: "Description 4",
      date: "01/09/2024, 05:30:00",
    },
    {
      id: "task-5",
      title: "Task 5",
      description: "Description 5",
      date: "01/09/2020, 05:30:00",
    },
  ],
  done: [
    {
      id: "task-6",
      title: "Task 6",
      description: "Description 6",
      date: "01/09/2020, 05:30:00",
    },
  ],
};

const Board = () => {
  const [tasks, setTasks] = useState(initialData);
  const [filteredTasks, setFilteredTasks] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [viewTask, setViewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [task, setTask] = useState();

  useEffect(() => {
    // check if user loggedIn
    // fetch tasks API call
  });
  useEffect(() => {
    const filterAndSortTasks = () => {
      const filteredAndSortedTasks = {};
      Object.keys(tasks).forEach((colId) => {
        // Filter tasks based on the search query
        let filtered = tasks[colId].filter(
          (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Sort tasks based on "recent" or "oldest"
        if (sortBy === "recent") {
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === "oldest") {
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        filteredAndSortedTasks[colId] = filtered;
      });
      setFilteredTasks(filteredAndSortedTasks); // Update filtered tasks without changing original tasks
    };

    filterAndSortTasks();
  }, [searchQuery, sortBy, tasks]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    const sourceCol = tasks[source.droppableId];
    const destCol = tasks[destination.droppableId];
    const [movedTask] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });

    // update tasks API call
  };

  return (
    <>
      <div className={styles.addTaskBtn} onClick={() => setAddTask(true)}>
        Add Task
      </div>
      <div className={styles.controls}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div>
          <label>Sort By: </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {["todo", "inProgress", "done"].map((colId) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div
                  className={styles.column}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h5>{colId.toUpperCase()}</h5>
                  {filteredTasks[colId].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            task={task}
                            index={index}
                            setViewTask={setViewTask}
                            setEditTask={setEditTask}
                            setTask={setTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {viewTask && <TasksView task={task} onClose={() => setViewTask(false)} />}
      {editTask && <EditTask task={task} onClose={() => setEditTask(false)} />}
      {addTask && <AddTask onClose={() => setAddTask(false)} />}
    </>
  );
};

export default Board;