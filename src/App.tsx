import React, { useState } from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false}
    ])

    function removeTask(id:string) {
       let filteredTasks = tasks.filter(task => id !== task.id )
        setTasks(filteredTasks)
    }
    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let [filter,setFilter] = useState<FilterValuesType>("all")
    let tasksForTodoList = tasks;
    if (filter === "active") {
       tasksForTodoList = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
       tasksForTodoList = tasks.filter(task => task.isDone === true)
    }
    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
       <TodoList title={"What to learn"}
                 tasks={tasksForTodoList}
                 addTask={addTask}
                 removeTask = {removeTask}
                 changeFilter = {changeFilter}
       />

        </div>
    );
}

export default App;
