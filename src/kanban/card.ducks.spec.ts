import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {cardDucks} from './card.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const initState: KanbanState = Immutable({
    boards: [{ id: 'first', title: ''}],
    cards: [],
    columns: [{ id: 'first', boardId: 'first', title: ''}],
    activeBoard: 'first'
});
const cardReducer = createReducer(cardDucks, initState);

describe('Card reducers', () => {
    describe('Creating an initial first card', () => {
        const newCard = { columnId: 'first', title: 'new Card', description: 'new Card Description' };

        it('adds card to the list', () => {
            const createAction = cardDucks.create(newCard);
            const nextState = cardReducer(initState, createAction);

            expect(nextState.cards.length).toBe(1);
            expect(nextState.cards[0].columnId).toBe('first');
            expect(nextState.cards[0].title).toBe('new Card');
            expect(nextState.cards[0].description).toBe('new Card Description');
        });

        it('generates a card id', () => {
            const createAction = cardDucks.create(newCard);
            const nextState = cardReducer(initState, createAction);

            expect(nextState.cards[0].id.length).toBeGreaterThan(0);
        });

        it('keeps the previous state when column id is out of range', () => {
            const invalidCard = { columnId: 'invalid' };
            const createAction = cardDucks.create(invalidCard);
            const nextState = cardReducer(initState, createAction);

            expect(nextState).toBe(initState);
        });
    });

    describe('Creating a second card', () => {
        const firstCard = { columnId: 'first', title: '' };
        const newCard = { columnId: 'first', title: 'new Card' };

        it('adds card to the end of the list', () => {
            prevState = initState.setIn(['cards'], [firstCard]);

            const createAction = cardDucks.create(newCard);
            const nextState = cardReducer(prevState, createAction);

            expect(nextState.cards.length).toBe(2);
            expect(nextState.cards[1].title).toBe('new Card');
        });
    });

    describe('Updating a card', () => {
        const firstCard = { id: 'first', columnId: 'any', title: 'first', description: 'first description' };

        beforeEach(() => {
            prevState = initState.set('cards', [firstCard]);
        });

        it('sets new column id', () => {
            const updateAction = cardDucks.update({ cardId: 'first', columnId: 'first' });
            const nextState = cardReducer(prevState, updateAction);

            expect(nextState.cards[0].columnId).toBe('first');
        });

        it('sets new title', () => {
            const updateAction = cardDucks.update({ cardId: 'first', title: 'new title' });
            const nextState = cardReducer(prevState, updateAction);

            expect(nextState.cards[0].title).toBe('new title');
        });

        it('sets new description', () => {
            const updateAction = cardDucks.update({ cardId: 'first', description: 'new description' });
            const nextState = cardReducer(prevState, updateAction);

            expect(nextState.cards[0].description).toBe('new description');
        });

        it('keeps the previous state when column id is out of range', () => {
            const updateAction = cardDucks.update({ cardId: 'first', columnId: 'invalid' });
            const nextState = cardReducer(prevState, updateAction);
            expect(nextState).toBe(prevState);
        });

        it('keeps the previous state when card id is out of range', () => {
            const updateAction = cardDucks.update({ cardId: 'invalid', title: '' });
            const nextState = cardReducer(prevState, updateAction);
            expect(nextState).toBe(prevState);
        });
    });
});
