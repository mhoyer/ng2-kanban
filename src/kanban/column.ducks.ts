import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column} from '../types';

export const columnDucks = {
    create: createDuck('column/CREATE', createColumnReducer)
};

export function createColumnReducer(state: KanbanState, payload: { boardId: number, newColumn: Column }): KanbanState {
    const activeBoard = state.activeBoard;

    const boards = state.boards.map((board, i) => {
        if (i !== payload.boardId) {
            return board;
        };

        const newBoard: Board = {
            title: board.title,
            columns: board.columns.concat(payload.newColumn),
        };
        return newBoard;
    });

    const newState: KanbanState = {
        boards,
        activeBoard
    };

    return newState;
}
