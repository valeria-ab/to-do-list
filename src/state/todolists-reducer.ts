import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            let endState = [...state]
            return endState.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {id: action.todolistID, title: action.title, filter: 'all'}
            return [...state, newTodoList];

        case 'CHANGE-TODOLIST-TITLE': {
            let endState = [...state]
            let todolist = endState.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return endState;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let endState = [...state]
            let changedTodoList = endState.find(tl => tl.id === action.id);
            if (changedTodoList) {
                changedTodoList.filter = action.filter
            }
            return endState;
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistID: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}
