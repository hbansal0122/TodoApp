import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTask(data);
    }
    getTasks();
  }, [])

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
    return await response.json();
  }
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    return await response.json();
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
    setTask(tasks.filter((task) => (task.id !== id)));
  }

  const onToggle = async (id) => {
    const task = await fetchTask(id)
    const updatedTask = { ...task, reminder: !task.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatedTask) })
    const data = await res.json();
    setTask(tasks.map((task) =>
    (task.id === id ?
      { ...task, reminder: data.reminder } :
      task)));

  }
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(task) })
    const newTask = await res.json();
    setTask([...tasks, newTask]);
  }


  return (
    <div className="container">
      <Header title="Task Tracker" onClick={() => setShowAddTask(!showAddTask)} showAddButton={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={onToggle} /> : "Nothing to show"}
    </div>
  );
}

export default App;
