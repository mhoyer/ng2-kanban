import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {cardDucks} from './card.ducks';
import {KanbanState} from '../types';

let prevState: KanbanState;
const initState: KanbanState = Immutable({
    boards: [{
        title: '',
        columns: [{
            title: '',
            cards: []
        }]
    }],
    activeBoard: 0
});
const cardReducer = createReducer(cardDucks, initState);

describe('Card reducers', () => {
    describe('Creating an initial first card', () => {
        const newCard = { title: 'new Card', description: 'new Card Description' };

        it('adds card to the list', () => {
            const createAction = cardDucks.create({boardId: 0, columnId: 0, newCard});
            const nextState = cardReducer(initState, createAction);
            const nextCards = nextState.boards[0].columns[0].cards;

            expect(nextCards.length).toBe(1);
            expect(nextCards[0].title).toBe('new Card');
            expect(nextCards[0].description).toBe('new Card Description');
        });

        it('keeps the previous state when board id is out of range', () => {
            const createAction = cardDucks.create({boardId: 1, columnId: 0, newCard});
            const nextState = cardReducer(initState, createAction);

            expect(nextState).toBe(initState);
        });

        it('keeps the previous state when column id is out of range', () => {
            const createAction = cardDucks.create({boardId: 0, columnId: 1, newCard});
            const nextState = cardReducer(initState, createAction);

            expect(nextState).toBe(initState);
        });
    });

    describe('Creating a second card', () => {
        const firstCard = {title: 'first'};
        const newCard = {title: 'new Card'};

        it('adds card to the end of the list', () => {
            prevState = initState.setIn(['boards', 0, 'columns', 0, 'cards'], [firstCard]);

            const createAction = cardDucks.create({boardId: 0, columnId: 0, newCard});
            const nextState = cardReducer(prevState, createAction);
            const nextCards = nextState.boards[0].columns[0].cards;

            expect(nextCards.length).toBe(2);
            expect(nextCards[1].title).toBe('new Card');
        });
    });

    describe('Updating a card', () => {
        const firstCard = { title: 'first', description: 'first description' };

        beforeEach(() => {
            prevState = initState.setIn(['boards', 0, 'columns', 0, 'cards'], [firstCard]);
        });

        it('sets new title', () => {
            const updateAction = cardDucks.update({ boardId: 0, columnId: 0, cardId: 0, title: 'new title' });
            const nextState = cardReducer(prevState, updateAction);
            const nextCards = nextState.boards[0].columns[0].cards;

            expect(nextCards.length).toBe(1);
            expect(nextCards[0].title).toBe('new title');
        });

        it('sets new description', () => {
            const updateAction = cardDucks.update({ boardId: 0, columnId: 0, cardId: 0, description: 'new description' });
            const nextState = cardReducer(prevState, updateAction);
            const nextCards = nextState.boards[0].columns[0].cards;

            expect(nextCards.length).toBe(1);
            expect(nextCards[0].description).toBe('new description');
        });

        it('keeps the previous state when boardId is out of range', () => {
            const updateAction = cardDucks.update({ boardId: 99, columnId: 0, cardId: 0, title: 't', description: 'd' });
            const nextState = cardReducer(prevState, updateAction);
            expect(nextState).toBe(prevState);
        });

        it('keeps the previous state when columnId is out of range', () => {
            const updateAction = cardDucks.update({ boardId: 0, columnId: 99, cardId: 0, title: 't', description: 'd' });
            const nextState = cardReducer(prevState, updateAction);
            expect(nextState).toBe(prevState);
        });

        it('keeps the previous state when cardId is out of range', () => {
            const updateAction = cardDucks.update({ boardId: 0, columnId: 0, cardId: 99, title: 't', description: 'd' });
            const nextState = cardReducer(prevState, updateAction);
            expect(nextState).toBe(prevState);
        });
    });
});
