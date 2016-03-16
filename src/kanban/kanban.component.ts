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
                <button (click)="deleteBoard(id)">Delete Board</button>
            </li>
        </ul>
        <div *ngIf="selectedBoard">
            <h3>{{selectedBoard.title}}</h3>
            <input [value]="selectedBoard.title" #boardTitleEditor />
            <button (click)="renameBoard(boardTitleEditor.value)">Rename</button>
            <button (click)="deleteBoard()">Delete Board</button> |
            <button (click)="createColumn()">Create Column</button>
            <ul>
                <li *ngFor="#column of selectedBoard.columns; #colId = index">
                    {{column.title}}
                    <input [value]="column.title" #columnTitleEditor />
                    <button (click)="renameColumn(colId, columnTitleEditor.value)">Rename</button>
                    <button (click)="deleteColumn(colId)">Delete Column</button> |
                    <button (click)="createCard(colId)">Create Card</button>
                    <ul>
                        <li *ngFor="#card of column.cards">
                            <b>{{card.title}}</b> - {{card.description}}
                        </li>
                    </ul>
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

    // board related
    get selectedBoard() {
        return this.state.boards[this.state.activeBoard];
    }

    createBoard() {
        const newBoard = { title: `${this.state.boards.length + 1}. Board`, columns: [] };
        this.kanbanActions.board.create({newBoard});
    }

    selectBoard(boardId) {
        this.kanbanActions.board.select(boardId);
    }

    renameBoard(title) {
        this.kanbanActions.board.rename({ title });
    }

    deleteBoard(boardId?) {
        this.kanbanActions.board.delete(boardId);
    }

    // column related
    createColumn() {
        const boardId = this.state.activeBoard;
        const newColumn = {
            title: `${this.selectedBoard.columns.length + 1}. Column`,
            cards: []
        };
        this.kanbanActions.column.create({boardId, newColumn});
    }

    renameColumn(columnId, title) {
        const boardId = this.state.activeBoard;
        this.kanbanActions.column.rename({boardId, columnId, title});
    }

    deleteColumn(columnId) {
        const boardId = this.state.activeBoard;
        this.kanbanActions.column.delete({boardId, columnId});
    }

    // card related
    createCard(columnId) {
        const boardId = this.state.activeBoard;
        const newCard = {
            title: `${10 + (Math.random() * 89 & 100)}`,
            description: `${100 + (Math.random() * 899 & 1000)}`
        };
        this.kanbanActions.card.create({boardId, columnId, newCard});
    }
}
