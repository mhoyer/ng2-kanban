import {Store} from '@ngrx/store';
import {KanbanState} from '../types';
import BoardComponent from './board.component';

describe('BoardComponent', () => {
    const storeSubscribeSpy = sinon.spy();
    const columnCreateSpy = sinon.spy();
    const fakeStore = { subscribe: storeSubscribeSpy as any } as Store<KanbanState>;
    const fakeActions = {
        column: {
            create: columnCreateSpy
        }
    } as any;
    let sut: BoardComponent;

    beforeEach(() => {
        columnCreateSpy.reset();
        sut = new BoardComponent(fakeStore, fakeActions);
        sut.state = { } as KanbanState;
    });

    describe('Creating a new column', () => {
        it('dispatches action once', () => {
            sut.createColumn('any title');

            sinon.assert.calledOnce(columnCreateSpy);
        });

        it('dispatches action with correct board id', () => {
            sut.state.activeBoard = 'any board';
            sut.createColumn('any title');

            const createArg = columnCreateSpy.firstCall.args[0];

            expect(createArg.boardId).toBe('any board');
        });

        it('dispatches action with correct title', () => {
            sut.createColumn('any title');

            const createArg = columnCreateSpy.firstCall.args[0];

            expect(createArg.title).toBe('any title');
        });

        it('dispatches action with empty cards', () => {
            sut.createColumn('any title');

            const createArg = columnCreateSpy.firstCall.args[0];

            expect(createArg.cards.length).toBe(0);
        });
    });
});
