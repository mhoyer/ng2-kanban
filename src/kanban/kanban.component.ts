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
        <h3 *ngIf="selectedBoard">{{selectedBoard.title}}</h3>
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

    selectBoard(boardId) {
        this.kanbanActions.board.select(boardId);
    }
}
