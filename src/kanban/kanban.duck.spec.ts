import {createDispatchedActions} from 'redux-typed-ducks';
import {kanbanReducer, kanbanDispatchedActionsCreator} from './kanban.duck';

class SimpleStore {
    prevState;
    nextState;

    dispatch(action) {
        this.nextState = kanbanReducer(this.prevState, action);
    }
}
const simpleStore = new SimpleStore();
const kanbanActions = kanbanDispatchedActionsCreator(simpleStore);

describe('Kanban', () => {
    describe('Creating an initial first board', () => {
        const newBoard = { title: 'new Board' };

        beforeEach(() => {
            simpleStore.prevState = {
                boards: [],
                activeBoard: -1
            };
        });

        it('adds board to list', () => {
            kanbanActions.createBoard({newBoard});

            expect(simpleStore.nextState.boards.length).toBe(1);
            expect(simpleStore.nextState.boards[0].title).toBe('new Board');
        });

        it('activates new board', () => {
            kanbanActions.createBoard({newBoard});
            expect(simpleStore.nextState.activeBoard).toBe(0);
        });
    });

    describe('Creating a second board', () => {
        const firstBoard = { title: 'first' };
        const newBoard = { title: 'second' };

        beforeEach(() => {
            simpleStore.prevState = {
                boards: [firstBoard],
                activeBoard: 0
            };
        });

        it('adds board to the end of the list', () => {
            kanbanActions.createBoard({newBoard});

            expect(simpleStore.nextState.boards.length).toBe(2);
            expect(simpleStore.nextState.boards[1].title).toBe('second');
        });

        it('activates new board', () => {
            kanbanActions.createBoard({newBoard});
            expect(simpleStore.nextState.activeBoard).toBe(1);
        });
    });

    describe('Selecting a board', () => {
        const firstBoard = { title: 'first' };
        const secondBoard = { title: 'second' };

        beforeEach(() => {
            simpleStore.prevState = {
                boards: [firstBoard, secondBoard],
                activeBoard: 0
            };
        });

        it('sets the chosen one active', () => {
            kanbanActions.selectBoard(1);
            expect(simpleStore.nextState.activeBoard).toBe(1);
        });

        it('does not change when out of range', () => {
            kanbanActions.selectBoard(3);
            expect(simpleStore.nextState.activeBoard).toBe(0);
        });
    });
});
