import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {columnDucks} from './column.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const initState: KanbanState = Immutable({
    boards: [{ id: '0', title: ''}],
    cards: [],
    columns: [],
    activeBoard: '0'
});
const columnReducer = createReducer(columnDucks, initState);

describe('Column reducers', () => {
    describe('Creating an initial first column', () => {
        it('adds column to list', () => {
            const newColumn = { boardId: '0', title: 'new Column' };
            const createAction = columnDucks.create(newColumn);
            const nextState = columnReducer(initState, createAction);

            expect(nextState.columns.length).toBe(1);
            expect(nextState.columns[0].boardId).toBe('0');
            expect(nextState.columns[0].title).toBe('new Column');
        });

        it('generates a column id', () => {
            const newColumn = { boardId: '0', title: 'new Column' };
            const createAction = columnDucks.create(newColumn);
            const nextState = columnReducer(initState, createAction);

            expect(nextState.columns[0].id.length).toBeGreaterThan(0);
        });

        it('keeps the previous state when board id is out of range', () => {
            const newColumn = { boardId: '1', title: 'new Column' };
            const createAction = columnDucks.create(newColumn);
            const nextState = columnReducer(initState, createAction);

            expect(nextState).toBe(initState);
        });
    });

    describe('Creating a second column', () => {
        const firstColumn = { id: '0', boardId: '0', title: 'first' };
        const newColumn = { id: '1', boardId: '0', title: 'new column' };
        const createAction = columnDucks.create(newColumn);

        beforeEach(() => {
            prevState = initState.set('columns', [firstColumn]);
        });

        it('adds column to the end of the list', () => {
            const nextState = columnReducer(prevState, createAction);

            expect(nextState.columns.length).toBe(2);
            expect(nextState.columns[1].title).toBe('new column');
        });

        it('keeps specified column id', () => {
            const nextState = columnReducer(prevState, createAction);
            expect(nextState.columns[1].id).toBe('1');
        });
    });

    describe('Renaming a column', () => {
        const firstColumn = { id: 'first', title: 'first column' };

        beforeEach(() => {
            prevState = initState.setIn(['columns'], [firstColumn]);
        });

        it('updates its title', () => {
            const renameAction = columnDucks.rename({ columnId: 'first', title: 'updated' });
            const nextState = columnReducer(prevState, renameAction);

            expect(nextState.columns[0].title).toBe('updated');
        });

        it('keeps the previous state when column id is out of range', () => {
            const renameAction = columnDucks.rename({ columnId: 'any', title: '' });
            const nextState = columnReducer(prevState, renameAction);

            expect(nextState).toBe(prevState);
        });
    });

    describe('Deleting a column', () => {
        const firstColumn = { id: '0', title: 'first column' };

        beforeEach(() => {
            prevState = initState.setIn(['boards', 0, 'columns'], [firstColumn]);
        });

        it('removes it from the list of columns', () => {
            const deleteAction = columnDucks.delete('0');
            const nextState = columnReducer(prevState, deleteAction);

            expect(nextState.columns.length).toBe(0);
        });

        it('keeps the previous state when column id is out of range', () => {
            const deleteAction = columnDucks.delete('any');
            const nextState = columnReducer(prevState, deleteAction);

            expect(nextState).toBe(prevState);
        });
    });
});
