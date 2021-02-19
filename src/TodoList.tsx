import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

type TaskPropsType = {
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
        props.addTask(title.trim());
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
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                                   props.changeTaskStatus(t.id, e.currentTarget.checked)}

                        />
                        <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>x
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