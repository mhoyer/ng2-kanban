import { kanbanReducer, kanbanDispatchedActionsFactory } from './kanban.ducks';
import { KanbanState } from '../types';

describe('Kanban reducers', () => {
    it('passes previous state through when action type is unknown', () => {
        const prevState = {} as KanbanState;
        prevState.activeBoard = 'any board id';

        const nextState = kanbanReducer(prevState, { type: 'unknownActionType' });
        expect(nextState).toBe(prevState);
    });

    describe('initial state', () => {
        let initialState: KanbanState;

        beforeEach(() => {
            initialState = kanbanReducer(undefined, { type: 'any action' });
        });

        it('has no boards defined', () => {
            expect(initialState.boards.length).toBe(0);
        });

        it('has no cards defined', () => {
            expect(initialState.cards.length).toBe(0);
        });

        it('has no columns defined', () => {
            expect(initialState.columns.length).toBe(0);
        });

        it('has no active board defined', () => {
            expect(initialState.activeBoard).toBeFalsy();
        });
    });
});

describe('Factory to dispatch Kanban actions', () => {
    it('generates auto-dispatching action invokers bound to given store', () => {
        const fakeStore = { dispatch: sinon.spy() };
        const sut = kanbanDispatchedActionsFactory(fakeStore);

        sut.board.select('any board id');

        expect(fakeStore.dispatch.calledWith({ type: 'board/SELECT', payload: 'any board id' })).toBeTruthy();
    });

    it('generates action invokers that return concrete action when invoked', () => {
        const fakeStore = { dispatch: sinon.spy() };
        const sut = kanbanDispatchedActionsFactory(fakeStore);

        const action = sut.board.select('any board id');

        expect(action.type).toBe('board/SELECT');
        expect(action.payload).toBe('any board id');
    });
});
