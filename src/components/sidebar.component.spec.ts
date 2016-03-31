import SidebarComponent from './sidebar.component';

describe('SidebarComponent', () => {
    describe('Creating a new board', () => {
        it('dispatches action once', () => {
            let boardCreateCalls = 0;
            const fakeActions = {
                board: {
                    create: b => {
                        boardCreateCalls++;
                    }
                }
            } as any;
            const sut = new SidebarComponent(fakeActions);

            sut.createBoard('any title');

            expect(boardCreateCalls).toBe(1);
        });

        it('dispatches action with correct title', () => {
            let createdBoard;
            const fakeActions = {
                board: {
                    create: b => createdBoard = b
                }
            } as any;
            const sut = new SidebarComponent(fakeActions);

            sut.createBoard('any title');

            expect(createdBoard.title).toBe('any title');
        });
    });

    describe('Selecting a board', () => {
        it('dispatches action once', () => {
            let boardSelectCalls = 0;
            const fakeActions = {
                board: {
                    select: b => {
                        boardSelectCalls++;
                    }
                }
            } as any;
            const sut = new SidebarComponent(fakeActions);

            sut.selectBoard('any board');

            expect(boardSelectCalls).toBe(1);
        });

        it('dispatches action with correct board id', () => {
            let boardId;
            const fakeActions = {
                board: {
                    select: b => boardId = b
                }
            } as any;
            const sut = new SidebarComponent(fakeActions);

            sut.selectBoard('any board');

            expect(boardId).toBe('any board');
        });
    });
});
