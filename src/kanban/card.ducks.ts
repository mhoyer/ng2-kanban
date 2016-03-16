import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column, Card} from '../types';

export const cardDucks = {
    create: createDuck('card/CREATE', createCardReducer),
    update: createDuck('card/UPDATE', updateCardReducer),
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

type UpdateCardPayload = {
    boardId: number,
    columnId: number,
    cardId: number,
    title?: string,
    description?: string
};
export function updateCardReducer(state: KanbanState, payload: UpdateCardPayload): KanbanState {
    const {boardId, columnId, cardId, title, description} = payload;

    const board = state.boards[boardId];
    if (board === undefined) {
        return state;
    }

    const column = board.columns[columnId];
    if (column === undefined) {
        return state;
    }

    const card = column.cards[cardId]
    if (card === undefined) {
        return state;
    }

    const updatedCard = (card as any)
        .set('title', title === undefined ? card.title : title)
        .set('description', description === undefined ? card.description : description);

    return state.setIn(['boards', boardId, 'columns', columnId, 'cards', cardId], updatedCard);
}
