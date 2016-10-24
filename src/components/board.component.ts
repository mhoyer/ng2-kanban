import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {KanbanState, Board} from '../types';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'board',
    template: `<div *ngIf="board">
        <board-header [title]="board.title"
                      (menuButtonClicked)="toggleBoardOptions()">
        </board-header>
        <creator (create)="createColumn($event)"
                 class="column-creator"
                 placeholder="Title of new column">
        </creator>
        <div>
            <button>Rename Board</button>
            <button (click)="deleteBoard()">Delete Board</button>
        </div>
        <div class="column-container">
            <column *ngFor="let column of columns; trackBy: trackByColumnId" [column]="column"></column>
        </div>
    </div>`,
})
export default class BoardComponent {
    state: KanbanState;
    trackByColumnId = (idx, column) => column.id;
    @Input() board: Board;

    constructor(store: Store<KanbanState>, private kanbanActions: KanbanActions) {
        store.subscribe(s => this.state = s);
    }

    toggleBoardOptions() { }

    renameBoard(title) {
        this.kanbanActions.board.rename({ title });
    }

    deleteBoard(boardId?: string) {
        this.kanbanActions.board.delete(boardId);
    }

    // column related
    get columns() {
        return this.state.columns.filter(c => c.boardId === this.state.activeBoard);
    }

    createColumn(title: string) {
        const newColumn = {
            boardId: this.state.activeBoard,
            title: title,
            cards: []
        };
        this.kanbanActions.column.create(newColumn);
    }
}
