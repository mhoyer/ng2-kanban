import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board} from '../types';

export const boardDucks = {
    create: createDuck('board/CREATE', createBoardReducer),
    select: createDuck('board/SELECT', selectBoardReducer)
};

export function createBoardReducer(state: KanbanState, payload: {newBoard: Board}): KanbanState {
    const boards = state.boards.concat(payload.newBoard);
    const activeBoard = boards.length - 1;

    return Object.assign({}, state, {boards, activeBoard});
}

export function selectBoardReducer(state: KanbanState, boardId: number): KanbanState {
    const activeBoard = boardId;
    if (activeBoard >= state.boards.length) {
        return state;
    }

    return Object.assign({}, state, {activeBoard});
}
