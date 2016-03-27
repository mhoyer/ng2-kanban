import {Component, ChangeDetectionStrategy, Input} from 'angular2/core';
import {Store} from '@ngrx/store';
import {KanbanState, Board} from '../types';
import KanbanActions from '../kanban/kanban.ducks';
import CreatorComponent from './creator.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sidebar',
    directives: [CreatorComponent],
    template: `
        <header>
            <svg version="1.1" viewBox="0 0 500 500">
                <g>
                    <polygon fill="#B4B4B4" points="250,0 486,82 448,390    250,500   52,390 14,82"/>
                    <polygon fill="#A51E22" points="250,26 463,99 430,374   250,474   70,250"/>
                    <polygon fill="#DC2226" points="250,26                  250,474   70,374 37,99"/>
                    <polygon fill="#B4B4B4" points="250,40 401,367 344,367 312,291 250,291 180,271 250,249 296,249 230,95"/>
                    <polygon fill="#F3F3F3" points="250,40  99,367 156,367 186,291 250,291         250,249 204,249 250,140"/>
                </g>
            </svg>
            <h1>Kanban</h1>
        </header>
        
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
