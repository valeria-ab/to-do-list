import React, { useState } from 'react';
import './App.css';
import {TodoList} from './TodoList';

export type FilterValuesType = "all" | "active" | "completed";
function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "RestAPI", isDone: false}
    ])

    function removeTask(id:number) {
       let filteredTasks = tasks.filter(task => id !== task.id )
        setTasks(filteredTasks)
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
                 removeTask = {removeTask}
                 changeFilter = {changeFilter}
       />

        </div>
    );
}

export default App;
