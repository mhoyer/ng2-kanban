import {Component, ChangeDetectionStrategy, Input} from 'angular2/core';
import {Store} from '@ngrx/store';
import {KanbanState, Board} from '../types';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sidebar',
    template: `
        <h1>Angular 2 - Kanban</h1>
        <button (click)="createBoard()">Create Board</button>
        <ul>
            <li *ngFor="#board of boards">
                <a href="#" (click)="selectBoard(board.id)">{{board.title}}</a>
                <button (click)="deleteBoard(board.id)">Delete Board</button>
            </li>
        </ul>`,
})
export default class SidebarComponent {
    @Input() boards: Board[];

    constructor(private kanbanActions: KanbanActions) { }

    createBoard() {
        const newBoard = { title: `${this.boards.length + 1}. Board` };
        this.kanbanActions.board.create(newBoard);
    }

    selectBoard(boardId: string) {
        this.kanbanActions.board.select(boardId);
    }

    deleteBoard(boardId?: string) {
        this.kanbanActions.board.delete(boardId);
    }
}
