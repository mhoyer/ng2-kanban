import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column, Card} from '../types';
import {generateGuid} from '../utils';

export const cardDucks = {
    create: createDuck('card/CREATE', createCardReducer),
    delete: createDuck('card/DELETE', deleteCardReducer),
    update: createDuck('card/UPDATE', updateCardReducer),
};

export function createCardReducer(state: KanbanState, newCard: Card): KanbanState {
    newCard.id = newCard.id || generateGuid();
    if (!state.columns.find(c => c.id === newCard.columnId)) {
        return state;
    }

    const cards = state.cards.concat(newCard);
    return state.setIn(['cards'], cards);
}

type UpdateCardPayload = {
    cardId: string,
    columnId?: string,
    title?: string,
    description?: string
};
export function updateCardReducer(state: KanbanState, payload: UpdateCardPayload): KanbanState {
    const {cardId, columnId, title, description} = payload;
    const cardIndex = state.cards.findIndex(c => c.id === cardId);
    const card = state.cards[cardIndex];

    if (card === undefined) return state;
    if (columnId !== undefined && !state.columns.find(c => c.id === columnId)) {
        return state;
    }

    const nextCard = (card as any)
        .set('columnId', columnId === undefined ? card.columnId : columnId)
        .set('title', title === undefined ? card.title : title)
        .set('description', description === undefined ? card.description : description);

    return state.setIn(['cards', cardIndex], nextCard);
}

export function deleteCardReducer(state: KanbanState, cardId: string | string[]) {
    const cardIds = [].concat(cardId);
    const nextCards = state.cards.filter(c => cardIds.indexOf(c.id) < 0);

    if (nextCards.length === state.cards.length) {
        return state;
    }

    return state.set('cards', nextCards);
}