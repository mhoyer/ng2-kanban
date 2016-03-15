export interface KanbanState {
    boards: Board[];
    activeBoard: number;
}

export interface Board {
    title: string;
}
