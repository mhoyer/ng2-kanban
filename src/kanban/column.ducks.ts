import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column} from '../types';

export const columnDucks = {
    create: createDuck('column/CREATE', createColumnReducer)
};

export function createColumnReducer(state: KanbanState, payload: { boardId: number, newColumn: Column }): KanbanState {
    const board = state.boards[payload.boardId];
    const columns = board.columns.concat(payload.newColumn);

    return state.setIn(['boards', payload.boardId, 'columns'], columns);
}
