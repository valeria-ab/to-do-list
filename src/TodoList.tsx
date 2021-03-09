import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => {
props.addTask(title, props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const onAllClickHandler = () => { props.changeFilter('all', props.id) }
    const onActiveClickHandler = () => { props.changeFilter('active', props.id) }
    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id) }



    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={
                (newValue) => {props.changeTodoListTitle(newValue, props.id)}
            }/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm
                addItem={addTask}
            />

            <ul>
                {
                    props.tasks.map(t => <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={(e) =>
                                   props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                        />
                        <EditableSpan title={t.title} onChange={
                            (newValue) => props.changeTaskTitle(t.id, newValue, props.id)
                        }/>
                        <button onClick={() => props.removeTask(t.id, props.id)}>x
                        </button>
                    </li>)
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}

