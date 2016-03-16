import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Store} from '@ngrx/store';
import {KanbanState} from '../types';
import KanbanActions from './kanban.duck';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kanban',
    template: `<h1>Angular 2 - Kanban</h1>
        <button (click)="createBoard()">Create Board</button>
        <ul>
            <li *ngFor="#board of state.boards; #id = index">
                <a href="#" (click)="selectBoard(id)">{{board.title}}</a>
            </li>
        </ul>
        <div *ngIf="selectedBoard">
            <h3>{{selectedBoard.title}}</h3>
            <input [value]="selectedBoard.title" #boardTitleEditor />
            <button (click)="renameBoard(boardTitleEditor.value)">Rename</button>
            <button (click)="createColumn()">Create Column</button>
            <ul>
                <li *ngFor="#column of selectedBoard.columns">
                    {{column.title}}
                </li>
            </ul>
        </div>
        <hr /><pre>{{debugState}}</pre>`,
})
export default class KanbanComponent {
    state: KanbanState;
    constructor(store: Store<KanbanState>, private kanbanActions: KanbanActions) {
        store.subscribe(s => this.state = s);
    }

    get debugState() {
        return JSON.stringify(this.state, null, 2);
    }

    get selectedBoard() {
        return this.state.boards[this.state.activeBoard];
    }

    createBoard() {
        const newBoard = { title: `${this.state.boards.length + 1}. Board`, columns: [] };
        this.kanbanActions.board.create({newBoard});
    }

    createColumn() {
        const boardId = this.state.activeBoard;
        const newColumn = {
            title: `${this.selectedBoard.columns.length + 1}. Column`
        };
        this.kanbanActions.column.create({boardId, newColumn});
    }

    renameBoard(title) {
        this.kanbanActions.board.rename({ title });
    }

    selectBoard(boardId) {
        this.kanbanActions.board.select(boardId);
    }
}
