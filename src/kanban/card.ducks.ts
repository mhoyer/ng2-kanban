import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column, Card} from '../types';

export const cardDucks = {
    create: createDuck('card/CREATE', createCardReducer),
};

export function createCardReducer(state: KanbanState, payload: { boardId: number, columnId: number, newCard: Card }): KanbanState {
    const {boardId, columnId, newCard} = payload;

    const board = state.boards[boardId];
    if (board === undefined) {
        return state;
    }

    const column = board.columns[columnId];
    if (column === undefined) {
        return state;
    }

    const cards = column.cards.concat(newCard);

    return state.setIn(['boards', boardId, 'columns', columnId, 'cards'], cards);
}
