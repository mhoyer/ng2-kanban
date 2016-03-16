import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {columnDucks} from './column.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const columnReducer = createReducer(columnDucks, prevState);

describe('Column reducers', () => {
    describe('Creating an initial first column', () => {
        const newColumn = { title: 'new Column' };

        beforeEach(() => {
            prevState = Immutable({
                boards: [
                    { title: 'first board', columns: [] }
                ],
                activeBoard: 0
            });
        });

        it('adds column to list', () => {
            const createAction = columnDucks.create({boardId: 0, newColumn});
            const nextState = columnReducer(prevState, createAction);

            expect(nextState.boards[0].columns.length).toBe(1);
            expect(nextState.boards[0].columns[0].title).toBe('new Column');
        });

        it('keeps the previous state when board id is out of range', () => {
            const createAction = columnDucks.create({boardId: 1, newColumn});
            const nextState = columnReducer(prevState, createAction);

            expect(nextState).toBe(prevState);
        });
    });

    describe('Creating a second column', () => {
        const firstColumn = { title: 'first column' };
        const newColumn = { title: 'second column' };

        beforeEach(() => {
            const firstBoard = { title: 'first board', columns: [ firstColumn ] };
            prevState = Immutable({
                boards: [ firstBoard ],
                activeBoard: 0
            });
        });

        it('adds column to the end of the list', () => {
            const createAction = columnDucks.create({boardId: 0, newColumn});
            const nextState = columnReducer(prevState, createAction);

            expect(nextState.boards[0].columns.length).toBe(2);
            expect(nextState.boards[0].columns[1].title).toBe('second column');
        });
    });

    describe('Renaming a column', () => {
        const firstColumn = { title: 'first column' };

        beforeEach(() => {
            const firstBoard = { title: 'first board', columns: [ firstColumn ] };
            prevState = Immutable({
                boards: [ firstBoard ],
                activeBoard: 0
            });
        });

        it('updates its title', () => {
            const renameAction = columnDucks.rename({boardId: 0, columnId: 0, title: 'updated'});
            const nextState = columnReducer(prevState, renameAction);

            expect(nextState.boards[0].columns[0].title).toBe('updated');
        });

        it('keeps the previous state when column id is out of range', () => {
            const renameAction = columnDucks.rename({boardId: 0, columnId: 3, title: 'updated'});
            const nextState = columnReducer(prevState, renameAction);

            expect(nextState).toBe(prevState);
        });

        it('keeps the previous state when board id is out of range', () => {
            const renameAction = columnDucks.rename({boardId: 1, columnId: 0, title: 'updated'});
            const nextState = columnReducer(prevState, renameAction);

            expect(nextState).toBe(prevState);
        });
    });

    describe('Deleting a column', () => {
        const firstColumn = { title: 'first column' };

        beforeEach(() => {
            const firstBoard = { title: 'first board', columns: [ firstColumn ] };
            prevState = Immutable({
                boards: [ firstBoard ],
                activeBoard: 0
            });
        });

        it('removes it from the list of columns', () => {
            const deleteAction = columnDucks.delete({boardId: 0, columnId: 0});
            const nextState = columnReducer(prevState, deleteAction);

            expect(nextState.boards[0].columns.length).toBe(0);
        });

        it('keeps the previous state when column id is out of range', () => {
            const deleteAction = columnDucks.delete({boardId: 0, columnId: 3});
            const nextState = columnReducer(prevState, deleteAction);

            expect(nextState).toBe(prevState);
        });

        it('keeps the previous state when board id is out of range', () => {
            const deleteAction = columnDucks.delete({boardId: 1, columnId: 0});
            const nextState = columnReducer(prevState, deleteAction);

            expect(nextState).toBe(prevState);
        });
    });
});
