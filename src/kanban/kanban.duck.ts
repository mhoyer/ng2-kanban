import {createDuck, createReducer, createDispatchedActions} from 'redux-typed-ducks';
import {KanbanState, Board, Column} from '../types';
import {boardDucks} from './board.ducks';

export default class KanbanActions {
    board = boardDucks;
}

const kanbanActions = new KanbanActions();
const initialKanban = {
    boards: [],
    activeBoard: -1
};
export const kanbanReducer = createReducer(kanbanActions, initialKanban);
export const kanbanDispatchedActionsFactory = store => createDispatchedActions(kanbanActions, store);
