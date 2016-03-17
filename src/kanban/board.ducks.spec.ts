import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {boardDucks} from './board.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const initState: KanbanState = Immutable({
    boards: [],
    cards: [],
    columns: [],
});
const boardReducer = createReducer(boardDucks, initState);

describe('Board reducers', () => {
    describe('Creating an initial first board', () => {
        const newBoard = { title: 'new Board' };
        const createAction = boardDucks.create(newBoard);

        it('adds board to list', () => {
            const nextState = boardReducer(initState, createAction);

            expect(nextState.boards.length).toBe(1);
            expect(nextState.boards[0].title).toBe('new Board');
        });

        it('generates a board id', () => {
            const nextState = boardReducer(initState, createAction);
            expect(nextState.boards[0].id.length).toBeGreaterThan(0);
        });

        it('activates new board', () => {
            const nextState = boardReducer(initState, createAction);
            expect(nextState.activeBoard).toBe(nextState.boards[0].id);
        });
    });

    describe('Creating a second board with specific id', () => {
        const firstBoard = { id: '0', title: 'first' };
        const newBoard = { id: '1', title: 'second' };
        const createAction = boardDucks.create(newBoard);

        beforeEach(() => {
            prevState = initState
                .set('boards', [firstBoard])
                .set('activeBoard', '0');
        });

        it('adds board to the end of the list', () => {
            const nextState = boardReducer(prevState, createAction);

            expect(nextState.boards.length).toBe(2);
            expect(nextState.boards[1].title).toBe('second');
        });

        it('keeps specified board id', () => {
            const nextState = boardReducer(prevState, createAction);
            expect(nextState.boards[1].id).toBe('1');
        });

        it('activates new board', () => {
            const nextState = boardReducer(prevState, createAction);
            expect(nextState.activeBoard).toBe('1');
        });
    });

    describe('Renaming a board', () => {
        const firstBoard = { id: '0', title: 'first' };
        const secondBoard = { id: '1', title: 'second' };

        beforeEach(() => {
            prevState = initState
                .set('boards', [firstBoard, secondBoard])
                .set('activeBoard', '0');
        });

        describe('w/o providing a board id', () => {
            it('sets the new title of the currently active board', () => {
                const renameAction = boardDucks.rename({ title: 'updated' });
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[0].title).toBe('updated');
            });

            it('keeps the title of the other board(s)', () => {
                const renameAction = boardDucks.rename({ title: 'updated' });
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[1].title).toBe('second');
            });
        });

        describe('with specified board id', () => {
            it('does not change when board id is out of range', () => {
                const renameAction = boardDucks.rename({ boardId: 'any', title: 'updated' });
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState).toBe(prevState);
            });

            it('sets the new title of that one', () => {
                const renameAction = boardDucks.rename({ boardId: '1', title: 'updated' });
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[1].title).toBe('updated');
            });

            it('keeps the title of the other board(s)', () => {
                const renameAction = boardDucks.rename({ boardId: '1', title: 'updated' });
                const nextState = boardReducer(prevState, renameAction);
                expect(nextState.boards[0].title).toBe('first');
            });
        });
    });

    describe('Selecting a board', () => {
        const firstBoard = { id: '0', title: 'first' };
        const secondBoard = { id: '1', title: 'second' };

        beforeEach(() => {
            prevState = initState
                .set('boards', [firstBoard, secondBoard])
                .set('activeBoard', '0');
        });

        it('sets the chosen one active', () => {
            const selectAction = boardDucks.select('1');
            const nextState = boardReducer(prevState, selectAction);
            expect(nextState.activeBoard).toBe('1');
        });

        it('does not change when board id is out of range', () => {
            const selectAction = boardDucks.select('any');
            const nextState = boardReducer(prevState, selectAction);
            expect(nextState.activeBoard).toBe('0');
        });
    });

    describe('Deleting a board', () => {
        const firstBoard = { id: '0', title: 'first' };
        const secondBoard = { id: '1', title: 'second' };
        const thirdBoard = { id: '2', title: 'third' };

        beforeEach(() => {
            prevState = initState
                .set('boards', [firstBoard, secondBoard, thirdBoard])
                .set('activeBoard', '0');
        });

        describe('with specified board id', () => {
            it('does not remove anything when board id is out of range', () => {
                const deleteAction = boardDucks.delete('any');
                const nextState = boardReducer(prevState, deleteAction);
                expect(nextState).toBe(prevState);
            });

            it('removes it from the list', () => {
                const deleteAction = boardDucks.delete('0');
                const nextState = boardReducer(prevState, deleteAction);

                expect(nextState.boards.length).toBe(2);
                expect(nextState.boards).not.toContain(firstBoard);
                expect(nextState.boards).toContain(secondBoard);
                expect(nextState.boards).toContain(thirdBoard);
            });

            it('keeps the active state in case one to the right was deleted', () => {
                const deleteAction = boardDucks.delete('1');
                const nextState = boardReducer(prevState, deleteAction);
                expect(nextState.activeBoard).toBe('0');
            });

            it('updates the active state in case one to the left was deleted', () => {
                prevState = prevState.set('activeBoard', '2');
                const deleteAction = boardDucks.delete('0');

                const nextState = boardReducer(prevState, deleteAction);

                expect(nextState.activeBoard).toBe('2');
            });
        });

        describe('w/o providing a board id', () => {
            it('removes the active one', () => {
                const deleteAction = boardDucks.delete();

                const nextState = boardReducer(prevState, deleteAction);
                expect(nextState.boards.length).toBe(2);
                expect(nextState.boards).not.toContain(firstBoard);
                expect(nextState.boards).toContain(secondBoard);
                expect(nextState.boards).toContain(thirdBoard);
            });

            it('activates the next board', () => {
                prevState = prevState.set('activeBoard', '1');
                const deleteAction = boardDucks.delete();

                const nextState = boardReducer(prevState, deleteAction);
                expect(nextState.activeBoard).toBe('2');
            });

            it('activates the previous board in case the last one was active', () => {
                prevState = prevState.set('activeBoard', '2');
                const deleteAction = boardDucks.delete();

                const nextState = boardReducer(prevState, deleteAction);
                expect(nextState.activeBoard).toBe('1');
            });
        });
    });

    describe('Deleting the last remaining board', () => {
        const lastBoard = { id: 'last', title: '' };

        beforeEach(() => {
            prevState = initState
                .set('boards', [lastBoard])
                .set('activeBoard', 'last');
        });

        it('clears the list of boards', () => {
            const deleteAction = boardDucks.delete('last');
            const nextState = boardReducer(prevState, deleteAction);
            expect(nextState.boards.length).toBe(0);
        });

        it('sets "no" active board', () => {
            const deleteAction = boardDucks.delete('last');
            const nextState = boardReducer(prevState, deleteAction);
            expect(nextState.activeBoard).toBe(undefined);
        });
    });

    describe('Deleting a board that referenced by columns', () => {
        const board = { id: 'board', title: '' };
        const relatedColumn = { id: 'related', boardId: 'board', title: '' };
        const unrelatedColumn = { id: 'unrelated', boardId: 'any', title: '' };

        beforeEach(() => {
            prevState = initState
                .set('boards', [board])
                .set('columns', [relatedColumn, unrelatedColumn])
                .set('activeBoard', '0');
        });

        it('removes the related columns', () => {
            const deleteAction = boardDucks.delete('board');
            const nextState = boardReducer(prevState, deleteAction);
            expect(nextState.columns.length).toBe(1);
            expect(nextState.columns).not.toContain(relatedColumn);
        });

        it('keeps the unrelated columns', () => {
            const deleteAction = boardDucks.delete('board');
            const nextState = boardReducer(prevState, deleteAction);
            expect(nextState.columns).toContain(unrelatedColumn);
        });
    });
});
