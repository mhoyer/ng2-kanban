import SidebarComponent from './sidebar.component';

describe('SidebarComponent', () => {
    const boardCreateSpy = sinon.spy();
    const boardSelectSpy = sinon.spy();
    const fakeActions = {
        board: {
            create: boardCreateSpy,
            select: boardSelectSpy
        }
    } as any;
    let sut: SidebarComponent;

    beforeEach(() => {
        boardCreateSpy.reset();
        boardSelectSpy.reset();
        sut = new SidebarComponent(fakeActions);
    });

    describe('Creating a new board', () => {
        it('dispatches action once', () => {
            sut.createBoard('any title');

            sinon.assert.calledOnce(boardCreateSpy);
        });

        it('dispatches action with correct title', () => {
            sut.createBoard('any title');

            sinon.assert.calledWith(boardCreateSpy, { title: 'any title' });
        });
    });

    describe('Selecting a board', () => {
        it('dispatches action once', () => {
            sut.selectBoard('any board');

            sinon.assert.calledOnce(boardSelectSpy);
        });

        it('dispatches action with correct board id', () => {
            sut.selectBoard('any board');

            sinon.assert.calledWith(boardSelectSpy, 'any board');
        });
    });

    describe('Expanded state', () => {
        it('is set to collapsed initially', () => {
            expect(sut.isExpanded).toBeFalsy();
        });

        it('inverts to expanded mode when toggling', () => {
            sut.toggleExpandedState();

            expect(sut.isExpanded).toBeTruthy();
        });
    });
});
