import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными),
    // а вот значения этих св-в это массив объектов TaskPropsType
    [key: string]: Array<TaskPropsType>
}

function App() {
    /*   let [tasks, setTasks] = useState([
           {id: v1(), title: 'HTML&CSS', isDone: true},
           {id: v1(), title: 'JS', isDone: true},
           {id: v1(), title: 'React', isDone: false},
           {id: v1(), title: 'RestAPI', isDone: false}
       ])*/
    let todoList1 = v1()
    let todoList2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'cheese', isDone: false},
        ]
    })

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to learn', filter: 'all'},
        {id: todoList2, title: 'What to buy', filter: 'active'}
    ])

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(task => id !== task.id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === id)

        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let changedTodoList = todoLists.find(tl => tl.id === todoListID);
        if (changedTodoList) {
            changedTodoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function  removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id!== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodoList = allTodolistTasks;

                        if (tl.filter === 'active') {
                            tasksForTodoList = allTodolistTasks.filter(task => task.isDone === false)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTodolistTasks.filter(task => task.isDone === true)
                        }
                        return <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            filter={tl.filter}
                        />
                    }
                )
            }

        </div>
    );
}

export default App;
