import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {CheckBox, Delete} from "@material-ui/icons";

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

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={
                (newValue) => {
                    props.changeTodoListTitle(newValue, props.id)
                }
            }/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />

            <div>
                {
                    props.tasks.map(t => <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            color={'primary'}
                            checked={t.isDone}
                            onChange={(e) =>
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                        />
                        <EditableSpan title={t.title} onChange={
                            (newValue) => props.changeTaskTitle(t.id, newValue, props.id)
                        }/>
                        <IconButton onClick={() => props.removeTask(t.id, props.id)}>
                            <Delete/>
                        </IconButton>
                    </div>)
                }

            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color={'default'}
                >All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                >Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                >Completed</Button>
            </div>
        </div>
    )
}

