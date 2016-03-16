import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {boardDucks} from './board.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const boardReducer = createReducer(boardDucks, prevState);

describe('Board reducers', () => {
    describe('Creating an initial first board', () => {
        const newBoard = { title: 'new Board', columns: [] };
        const createAction = boardDucks.create({newBoard});

        beforeEach(() => {
            prevState = {
                boards: [],
                activeBoard: -1
            };
        });

        it('adds board to list', () => {
            const nextState = boardReducer(prevState, createAction);

            expect(nextState.boards.length).toBe(1);
            expect(nextState.boards[0].title).toBe('new Board');
        });

        it('activates new board', () => {
            const nextState = boardReducer(prevState, createAction);
            expect(nextState.activeBoard).toBe(0);
        });
    });

    describe('Creating a second board', () => {
        const firstBoard = { title: 'first', columns: [] };
        const newBoard = { title: 'second', columns: [] };
        const createAction = boardDucks.create({newBoard});

        beforeEach(() => {
            prevState = {
                boards: [firstBoard],
                activeBoard: 0
            };
        });

        it('adds board to the end of the list', () => {
            const nextState = boardReducer(prevState, createAction);

            expect(nextState.boards.length).toBe(2);
            expect(nextState.boards[1].title).toBe('second');
        });

        it('activates new board', () => {
            const nextState = boardReducer(prevState, createAction);
            expect(nextState.activeBoard).toBe(1);
        });
    });

    describe('Selecting a board', () => {
        const firstBoard = { title: 'first', columns: [] };
        const secondBoard = { title: 'second', columns: [] };

        beforeEach(() => {
            prevState = {
                boards: [firstBoard, secondBoard],
                activeBoard: 0
            };
        });

        it('sets the chosen one active', () => {
            const selectAction = boardDucks.select(1);
            const nextState = boardReducer(prevState, selectAction);
            expect(nextState.activeBoard).toBe(1);
        });

        it('does not change when out of range', () => {
            const selectAction = boardDucks.select(3);
            const nextState = boardReducer(prevState, selectAction);
            expect(nextState.activeBoard).toBe(0);
        });
    });
});
