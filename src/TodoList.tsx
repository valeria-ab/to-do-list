import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {CheckBox, Delete} from "@material-ui/icons";
import {TasksStateType} from "./AppWithRedux";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (todoListID: string, title: string) => void
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter(props.id, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, 'completed')
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={
                (newValue) => {
                    props.changeTodolistTitle(props.id, newValue )
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
                            color={'secondary'}
                            checked={t.isDone}
                            onChange={(e) =>
                                props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)}
                        />
                        <EditableSpan title={t.title} onChange={
                            (newValue) => props.changeTaskTitle(props.id, t.id, newValue )
                        }/>
                        <IconButton onClick={() => props.removeTask(props.id, t.id)}>
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

