import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column} from '../types';

export const columnDucks = {
    create: createDuck('column/CREATE', createColumnReducer),
    delete: createDuck('column/DELETE', deleteColumnReducer),
};

export function createColumnReducer(state: KanbanState, payload: { boardId: number, newColumn: Column }): KanbanState {
    const {boardId, newColumn} = payload;
    const board = state.boards[boardId];
    if (board === undefined) {
        return state;
    }
    const columns = board.columns.concat(newColumn);

    return state.setIn(['boards', boardId, 'columns'], columns);
}

export function deleteColumnReducer(state: KanbanState, payload: { boardId: number, columnId: number }) {
    const {boardId, columnId} = payload;
    const board = state.boards[boardId];
    if (board === undefined || board.columns[columnId] === undefined) {
        return state;
    }
    const columns = board.columns.filter((c, i) => i !== columnId);

    return state.setIn(['boards', boardId, 'columns'], columns);
}
