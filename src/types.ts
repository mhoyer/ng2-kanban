import * as si from 'seamless-immutable';

export type KanbanState = si.Immutable<{
    boards: Board[];
    cards: Card[];
    columns: Column[];
    activeBoard?: string;
}>;

export type AppState = {
    kanban: KanbanState;
}

export interface Board {
    id?: string;
    title: string;
}

export interface Column {
    id?: string;
    boardId: string;
    title: string;
}

export interface Card {
    id?: string;
    columnId: string;
    title?: string;
    description?: string;
}
