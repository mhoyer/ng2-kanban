import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board} from '../types';

export const boardDucks = {
    create: createDuck('board/CREATE', createBoardReducer),
    delete: createDuck('board/DELETE', deleteBoardReducer),
    rename: createDuck('board/RENAME', renameBoardReducer),
    select: createDuck('board/SELECT', selectBoardReducer),
};

export function createBoardReducer(state: KanbanState, payload: { newBoard: Board }): KanbanState {
    const activeBoard = state.boards.length;
    const boards = state.boards.concat(payload.newBoard);

    return state
        .set('boards', boards)
        .set('activeBoard', activeBoard);
}

export function deleteBoardReducer(state: KanbanState, boardId?: number): KanbanState {
    if (boardId === undefined) {
        boardId = state.activeBoard;
    }

    if (state.boards[boardId] === undefined) {
        return state;
    }

    const boards = state.boards.filter((b, i) => boardId !== i);
    const activeBoard = Math.min(state.activeBoard, boards.length - 1);

    return state
        .set('boards', boards)
        .set('activeBoard', activeBoard);
}

export function renameBoardReducer(state: KanbanState, payload: { title: string, boardId?: number }): KanbanState {
    const boardId = payload.boardId || state.activeBoard;

    if (state.boards[boardId] === undefined) {
        return state;
    }

    return state.setIn(['boards', boardId, 'title'], payload.title);
}

export function selectBoardReducer(state: KanbanState, boardId: number): KanbanState {
    const activeBoard = boardId;
    if (activeBoard >= state.boards.length) {
        return state;
    }
    return state.set('activeBoard', activeBoard);
}
