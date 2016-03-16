import Immutable from 'seamless-immutable';
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
            prevState = Immutable({
                boards: [],
                activeBoard: -1
            });
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
            prevState = Immutable({
                boards: [firstBoard],
                activeBoard: 0
            });
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

    describe('Renaming a board', () => {
        const firstBoard = { title: 'first', columns: [] };
        const secondBoard = { title: 'second', columns: [] };

        beforeEach(() => {
            prevState = Immutable({
                boards: [firstBoard, secondBoard],
                activeBoard: 0
            });
        });

        it('does not change when board id is out of range', () => {
            const renameAction = boardDucks.rename({boardId: 3, title: 'updated'});
            const nextState = boardReducer(prevState, renameAction);
            expect(nextState).toBe(prevState);
        });

        describe('w/o providing an id', () => {
            it('sets the new title of the currently active board', () => {
                const renameAction = boardDucks.rename({title: 'updated'});
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[0].title).toBe('updated');
            });

            it('keeps the title of the other board(s)', () => {
                const renameAction = boardDucks.rename({title: 'updated'});
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[1].title).toBe('second');
            });
        });

        describe('with spcified id', () => {
            it('sets the new title of that one', () => {
                const renameAction = boardDucks.rename({boardId: 1, title: 'updated'});
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[1].title).toBe('updated');
            });

            it('keeps the title of the other board(s)', () => {
                const renameAction = boardDucks.rename({boardId: 1, title: 'updated'});
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[0].title).toBe('first');
            });
        });
    });

    describe('Selecting a board', () => {
        const firstBoard = { title: 'first', columns: [] };
        const secondBoard = { title: 'second', columns: [] };

        beforeEach(() => {
            prevState = Immutable({
                boards: [firstBoard, secondBoard],
                activeBoard: 0
            });
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
