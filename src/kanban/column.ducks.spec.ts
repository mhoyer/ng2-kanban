import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {columnDucks} from './column.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const columnReducer = createReducer(columnDucks, prevState);

describe('Column reducers', () => {
    describe('Creating an initial first column', () => {
        const newColumn = { title: 'new Column' };
        const createAction = columnDucks.create({boardId: 0, newColumn});

        beforeEach(() => {
            prevState = Immutable({
                boards: [
                    { title: 'first board', columns: [] }
                ],
                activeBoard: 0
            });
        });

        it('adds column to list', () => {
            const nextState = columnReducer(prevState, createAction);

            expect(nextState.boards[0].columns.length).toBe(1);
            expect(nextState.boards[0].columns[0].title).toBe('new Column');
        });
    });

    describe('Creating a second column', () => {
        const firstColumn = { title: 'first column' };
        const newColumn = { title: 'second column' };
        const createAction = columnDucks.create({boardId: 0, newColumn});

        beforeEach(() => {
            const firstBoard = { title: 'first board', columns: [ firstColumn ] };
            prevState = Immutable({
                boards: [ firstBoard ],
                activeBoard: 0
            });
        });

        it('adds column to the end of the list', () => {
            const nextState = columnReducer(prevState, createAction);

            expect(nextState.boards[0].columns.length).toBe(2);
            expect(nextState.boards[0].columns[1].title).toBe('second column');
        });
    });
});
