import {Component, ChangeDetectionStrategy, Input} from 'angular2/core';
import {Store} from '@ngrx/store';
import {KanbanState, Board} from '../types';
import KanbanActions from '../kanban/kanban.ducks';
import KanbanHeaderComponent from './kanbanHeader.component';
import CreatorComponent from './creator.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sidebar',
    directives: [KanbanHeaderComponent, CreatorComponent],
    template: `
        <kanban-header></kanban-header>
        <creator (create)="createBoard($event)" placeholder="Title of new board"></creator>

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

    createBoard(title) {
        const newBoard = { title };
        this.kanbanActions.board.create(newBoard);
    }

    selectBoard(boardId: string) {
        this.kanbanActions.board.select(boardId);
    }

    deleteBoard(boardId?: string) {
        this.kanbanActions.board.delete(boardId);
    }
}
