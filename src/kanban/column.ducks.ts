import {createDuck} from 'redux-typed-ducks';
import {KanbanState, Board, Column} from '../types';
import {generateGuid} from '../utils';
import {deleteCardReducer} from './card.ducks';

export const columnDucks = {
    create: createDuck('column/CREATE', createColumnReducer),
    delete: createDuck('column/DELETE', deleteColumnReducer),
    rename: createDuck('column/RENAME', renameColumnReducer),
};

export function createColumnReducer(state: KanbanState, newColumn: Column): KanbanState {
    newColumn.id = newColumn.id || generateGuid();
    if (state.boards.findIndex(b => b.id === newColumn.boardId) < 0) {
        return state;
    }

    const nextColumns = state.columns.concat(newColumn);
    return state.setIn(['columns'], nextColumns);
}

export function deleteColumnReducer(state: KanbanState, columnId: string | string[]) {
    const columnIds = [].concat(columnId);
    const nextColumns = state.columns.filter(c => columnIds.indexOf(c.id) < 0);
    if (nextColumns.length === state.columns.length) {
        return state;
    }

    // cascading delete of related cards
    const cardIds = state.cards
        .filter(c => columnIds.indexOf(c.columnId) >= 0)
        .map(c => c.id);

    state = deleteCardReducer(state, cardIds);

    return state.setIn(['columns'], nextColumns);
}

export function renameColumnReducer(state: KanbanState, payload: { columnId: string, title: string }) {
    const {columnId, title} = payload;
    const columnIndex = state.columns.findIndex(c => c.id === columnId);
    if (columnIndex < 0) {
        return state;
    }

    return state.setIn(['columns', columnIndex, 'title'], title);
}
