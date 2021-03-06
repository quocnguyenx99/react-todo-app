import React, { useState } from "react";

import { nanoid } from "nanoid";

import Todo  from "./components/Todo";
import Form from './components/Form';
import FilterButton from "./components/FilterButton";


const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  // Adding task
  const addTask = (name) => {
    const newTask = {id: 'todo-' + nanoid(), name: name, completed: false}
    setTasks([...tasks, newTask])
  }


  // Checked completed task
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if(task.id === id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  // Delete task
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id != task.id)
    setTasks(remainingTasks)
  } 

  // Edit task
  const editTask = (id, newName) => {
    const editTaskList = tasks.map(task => {
      if(task.id === id) {
        return {...task, name: newName}
      }

      return task
    });
    setTasks(editTaskList)
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo 
      key={task.id}
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));


  // Counting task
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task' 
  const headingText = `${taskList.length} ${tasksNoun} remaining`


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
       {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
