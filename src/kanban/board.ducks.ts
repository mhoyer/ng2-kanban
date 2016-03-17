import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board} from '../types';
import {generateGuid} from '../utils';
import {deleteColumnReducer} from './column.ducks';

export const boardDucks = {
    create: createDuck('board/CREATE', createBoardReducer),
    delete: createDuck('board/DELETE', deleteBoardReducer),
    rename: createDuck('board/RENAME', renameBoardReducer),
    select: createDuck('board/SELECT', selectBoardReducer),
};

export function createBoardReducer(state: KanbanState, newBoard: Board): KanbanState {
    newBoard.id = newBoard.id || generateGuid();
    const activeBoard = newBoard.id;
    const boards = state.boards.concat(newBoard);

    return state
        .set('boards', boards)
        .set('activeBoard', activeBoard);
}

export function deleteBoardReducer(state: KanbanState, boardId?: string): KanbanState {
    boardId = boardId || state.activeBoard;
    const nextBoards = state.boards.filter(b => b.id !== boardId);
    if (nextBoards.length === state.boards.length) {
        return state;
    }

    // update active board state
    if (boardId === state.activeBoard) {
        const boardIndex = state.boards.findIndex(b => b.id === boardId);
        const activeBoardIndex = Math.min(boardIndex, nextBoards.length - 1);
        const nextActiveBoard = nextBoards[activeBoardIndex];
        state = state.set('activeBoard', nextActiveBoard && nextActiveBoard.id);
    }

    // cascading delete of related columns
    const columnIds = state.columns
        .filter(c => c.boardId === boardId)
        .map(c => c.id);
    state = deleteColumnReducer(state, columnIds);

    return state.set('boards', nextBoards);
}

export function renameBoardReducer(state: KanbanState, payload: { title: string, boardId?: string }): KanbanState {
    const boardId = payload.boardId || state.activeBoard;
    const boardIndex = state.boards.findIndex(b => b.id === boardId);

    if (boardIndex < 0) return state;

    return state.setIn(['boards', boardIndex, 'title'], payload.title);
}

export function selectBoardReducer(state: KanbanState, boardId: string): KanbanState {
    const activeBoard = boardId;
    const boardIndex = state.boards.findIndex(b => b.id === boardId);

    if (boardIndex < 0) return state;

    return state.set('activeBoard', activeBoard);
}
