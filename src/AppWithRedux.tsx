import React from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskType, TodoList} from "./TodoList";
import {FilterValuesType} from "./App";

export type TasksFilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: TasksFilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)



    const changeFilter = (todoListId: string, value: FilterValuesType) => {

        const action = changeTodolistFilterAC(todoListId, value)

        dispatch(action)

    }


    const removeTask = (todolistId: string, taskId: string) => {

        dispatch(removeTaskAC(todolistId,taskId))

    }


    const addTask = (todolistId: string, newTaskTitle: string) => {

        dispatch(addTaskAC(todolistId, newTaskTitle))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {

        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))

    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {

        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))

    }

    function removeTodolist(todolistId: string) {

        dispatch(removeTodolistAC(todolistId))

    }

    function addTodoList(title: string) {

        const action = addTodolistAC(title)

        dispatch(action)

    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {

        dispatch(changeTodolistTitleAC(todolistId,newTitle))

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={3} style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(td => {
                            let allTodolistTasks = tasks[td.id]
                            let tasksForTodolist = allTodolistTasks

                            if (td.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                            }
                            if (td.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList key={td.id}
                                              id={td.id}
                                              title={td.title}
                                              tasks={tasksForTodolist}
                                              filter={td.filter}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              removeTodolist={removeTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>
        </div>
    )
}

export default AppWithRedux;
