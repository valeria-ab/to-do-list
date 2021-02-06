import React from 'react';
import './App.css';
import {TodoList} from './TodoList';

function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Cheese", isDone: false},
        {id: 2, title: "Orange juice", isDone: false},
        {id: 3, title: "Bread", isDone: false}
    ]

    return (
        <div className="App">
       <TodoList title={"What to learn"} tasks={tasks1} />
       <TodoList title={"What to buy"} tasks={tasks2} />

        </div>
    );
}

export default App;
