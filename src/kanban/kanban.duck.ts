import {createDuck, createReducer, createDispatchedActions} from 'redux-typed-ducks';
import {KanbanState, Board} from '../types';

export default class KanbanActions {
    createBoard = createDuck('kanban/CREATE_BOARD', createBoardReducer);
    selectBoard = createDuck('kanban/SELECT_BOARD', selectBoardReducer);
}

const kanbanActions = new KanbanActions();
const initialKanban = {
    boards: [],
    activeBoard: -1
};
export const kanbanReducer = createReducer(kanbanActions, initialKanban);
export const kanbanDispatchedActionsCreator = store => createDispatchedActions(kanbanActions, store);

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