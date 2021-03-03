import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')
    const addTask = () => {
        if (title.trim() === '') {
            setError('Неверное значение')
            return
        }
        props.addTask(title.trim(), props.id);
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    };
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodoList = () => {
       props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>

            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error? 'error' : ''}
                />
                <button onClick={addTask}>+
                </button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={(e) =>
                                   props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}

                        />
                        <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id, props.id )}>x
                        </button>
                    </li>)
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all'? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active'? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'completed'? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}