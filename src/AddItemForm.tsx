import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    };
    const addItem = () => {
        if (title.trim() === '') {
            setError('Название не может быть пустым')
            return
        }
        props.addItem(title.trim());
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
        }
    };


    return (
        <div>
            <TextField
                variant={"outlined"}
                label={'Введите название задачи'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={addItem}
            >
                <AddBox />
            </IconButton>
        {/*    {error && <div className={'error-message'}>{error}</div>}*/}
        </div>)
}