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

        <ul>
            <li *ngFor="let column of columns">
                {{column.title}}
                <input [value]="column.title" #columnTitleEditor />
                <button (click)="renameColumn(column.id, columnTitleEditor.value)">Rename</button>
                <button (click)="deleteColumn(column.id)">Delete Column</button> |
                <button (click)="createCard(column.id)">Create Card</button>
                <ul>
                    <li *ngFor="let card of cards(column.id)">
                        <b>{{card.title}}</b> - {{card.description}}
                        <input [value]="card.title" #cardTitleEditor />
                        <input [value]="card.description" #cardDescriptionEditor />
                        <button (click)="updateCard(card.id, cardTitleEditor.value, cardDescriptionEditor.value)">Update</button>
                        <button (click)="deleteCard(card.id)">Delete</button>
                    </li>
                </ul>
            </li>
        </ul>
    </div>`,
})
export default class BoardComponent {
    state: KanbanState;
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

    renameColumn(columnId, title) {
        this.kanbanActions.column.rename({ columnId, title });
    }

    deleteColumn(columnId) {
        this.kanbanActions.column.delete(columnId);
    }

    // card related
    cards(columnId) {
        return this.state.cards.filter(c => c.columnId === columnId);
    };

    createCard(columnId) {
        const newCard = {
            columnId,
            title: `${10 + (Math.random() * 89 & 100)}`,
            description: `${100 + (Math.random() * 899 & 1000)}`
        };
        this.kanbanActions.card.create(newCard);
    }

    updateCard(cardId, title, description) {
        this.kanbanActions.card.update({ cardId, title, description });
    }

    deleteCard(cardId) {
        this.kanbanActions.card.delete(cardId);
    }
}
