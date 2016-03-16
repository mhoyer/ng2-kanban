import Immutable from 'seamless-immutable';
import {createDispatchedActions, createReducer} from 'redux-typed-ducks';
import {cardDucks} from './card.ducks';
import {KanbanState} from '../types';

let prevState = Immutable({
    boards: [{
        title: '',
        columns: [{
            title: '',
            cards: []
        }]
    }],
    activeBoard: 0
});
const cardReducer = createReducer(cardDucks, prevState);

describe('Card reducers', () => {
    describe('Creating an initial first card', () => {
        const newCard = {title: 'new Card'};

        it('adds card to the list', () => {
            const createAction = cardDucks.create({boardId: 0, columnId: 0, newCard});
            const nextState = cardReducer(prevState, createAction);

            expect(nextState.boards[0].columns[0].cards.length).toBe(1);
            expect(nextState.boards[0].columns[0].cards[0].title).toBe('new Card');
        });

        it('keeps the previous state when board id is out of range', () => {
            const createAction = cardDucks.create({boardId: 1, columnId: 0, newCard});
            const nextState = cardReducer(prevState, createAction);

            expect(nextState).toBe(prevState);
        });

        it('keeps the previous state when column id is out of range', () => {
            const createAction = cardDucks.create({boardId: 0, columnId: 1, newCard});
            const nextState = cardReducer(prevState, createAction);

            expect(nextState).toBe(prevState);
        });
    });

    describe('Creating a second card', () => {
        const firstCard = {title: 'first'};
        const newCard = {title: 'new Card'};

        it('adds column to the end of the list', () => {
            prevState = prevState.setIn(['boards', 0, 'columns', 0, 'cards'], [firstCard]);

            const createAction = cardDucks.create({boardId: 0, columnId: 0, newCard});
            const nextState = cardReducer(prevState, createAction);

            expect(nextState.boards[0].columns[0].cards.length).toBe(2);
            expect(nextState.boards[0].columns[0].cards[1].title).toBe('new Card');
        });
    });
});
