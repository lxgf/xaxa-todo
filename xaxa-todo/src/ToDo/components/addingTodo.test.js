import React from 'react';
import {
    act, render,
    screen,
    waitFor,
    waitForElementToBeRemoved
} from "@testing-library/react";
import {Main} from "./main";
import firebase from "firebase/compat";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';
import { firestore, mockToDo } from "./FirebaseMock";

describe('Добавление дела', () => {
    it('Ввод текста в форму', async () => {
        act(() => render(<Main db={firestore()} />))

        userEvent.type(screen.getByLabelText('todo-input'), 'test')
        console.log('В поле ввода содержится текст: ', screen.getByLabelText('todo-input').value)
        expect(screen.getByLabelText('todo-input').value).toContain('test')
    });

    it('Get data from firebase db', async () => {
        const { getByText } = render(<Main db={firestore()} />) //Рендерим компонент Main и передаём ему ч/з пропсы firebase.firestore, после инициализации приложения


        expect(getByText('Загрузка...')).toBeInTheDocument();
        await waitForElementToBeRemoved(getByText('Загрузка...'));

        mockToDo.todos.forEach(todo => {
            expect(getByText(todo)).toBeInTheDocument();
        })

    });

});