import { useState, useEffect } from "react";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
import {Container} from "./components/Container"

function App() {
  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setshowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!tasksItems.find((task) => task.name === taskName)) {
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      tasksItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("task");
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasksItems));
  }, [tasksItems]);

  const cleanTask = () => {
    setTasksItems(tasksItems.filter(task => !task.done))
    setshowCompleted(false)
  } 

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable task={tasksItems} toggleTask={toggleTask} />
        <VisibilityControl 
        setshowCompleted={(checked) => setshowCompleted(checked)}
        cleanTask={cleanTask}
        isChecked={showCompleted}
        />
        {showCompleted === true && (
          <TaskTable
            task={tasksItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
