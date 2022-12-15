import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// Custm Components
import CustomForm from './Components/CustomForm';
import EditForm from './Components/EditForm';
import TaskList from './Components/TaskList';

function App() {

  const [tasks, setTasks] = useLocalStorage('todo-app.tasks', [])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [prevFocusEl, setPrevFocusEl] = useState(null)

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (taskId) => {
    setTasks(prevState => prevState.filter(t =>t.id !== taskId))
  }

  const toggleTask = (taskId) => {
    setTasks(prevState => prevState.map(t => (
      t.id === taskId
      ? {... t, checked: !t.checked}
      : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
      ? { ... t, name: task.name }
      : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    prevFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPrevFocusEl(document.activeElement)
  }

  return (
    <>
      <div className='container'>
        <header>
          <h1>My Task List</h1>
        </header>
        {
          isEditing && (
            <EditForm 
              editedTask={editedTask}
              updateTask={updateTask}
              closeEditMode={closeEditMode}
            />
          )

        }
        
        <CustomForm addTask={addTask} />
        {tasks && (
        <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleTask={toggleTask}
        enterEditMode={enterEditMode}
        />)}
      </div>
    </>
  );
}

export default App;
