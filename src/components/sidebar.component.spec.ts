import SidebarComponent from './sidebar.component';

describe('SidebarComponent', () => {
    const boardCreateSpy = jasmine.createSpy('boardCreateSpy');
    const boardSelectSpy = jasmine.createSpy('boardSelectSpy');
    const fakeActions = {
        board: {
            create: boardCreateSpy,
            select: boardSelectSpy
        }
    } as any;
    let sut: SidebarComponent;

    beforeEach(() => {
        boardCreateSpy.calls.reset();
        boardSelectSpy.calls.reset();
        sut = new SidebarComponent(fakeActions);
    });

    describe('Creating a new board', () => {
        it('dispatches action once', () => {
            sut.createBoard('any title');

            expect(boardCreateSpy).toHaveBeenCalledTimes(1);
        });

        it('dispatches action with correct title', () => {
            sut.createBoard('any title');

            expect(boardCreateSpy).toHaveBeenCalledWith({ title: 'any title' });
        });
    });

    describe('Selecting a board', () => {
        it('dispatches action once', () => {
            sut.selectBoard('any board');

            expect(boardSelectSpy).toHaveBeenCalledTimes(1);
        });

        it('dispatches action with correct board id', () => {
            sut.selectBoard('any board');

            expect(boardSelectSpy).toHaveBeenCalledWith('any board');
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
