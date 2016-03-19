import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Store} from '@ngrx/store';
import {KanbanState} from '../types';
import SidebarComponent from '../components/sidebar.component';
import KanbanActions from './kanban.duck';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kanban',
    directives: [SidebarComponent],
    template: `
        <sidebar [boards]="state.boards"></sidebar>
        <board>
            <div *ngIf="selectedBoard">
                <h3>{{selectedBoard.title}}</h3>
                <input [value]="selectedBoard.title" #boardTitleEditor />
                <button (click)="renameBoard(boardTitleEditor.value)">Rename</button>
                <button (click)="deleteBoard()">Delete Board</button> |
                <button (click)="createColumn()">Create Column</button>
                <ul>
                    <li *ngFor="#column of columns">
                        {{column.title}}
                        <input [value]="column.title" #columnTitleEditor />
                        <button (click)="renameColumn(column.id, columnTitleEditor.value)">Rename</button>
                        <button (click)="deleteColumn(column.id)">Delete Column</button> |
                        <button (click)="createCard(column.id)">Create Card</button>
                        <ul>
                            <li *ngFor="#card of cards(column.id)">
                                <b>{{card.title}}</b> - {{card.description}}
                                <input [value]="card.title" #cardTitleEditor />
                                <input [value]="card.description" #cardDescriptionEditor />
                                <button (click)="updateCard(card.id, cardTitleEditor.value, cardDescriptionEditor.value)">Update</button>
                                <button (click)="deleteCard(card.id)">Delete</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <hr /><pre>{{debugState}}</pre>
        </board>`,
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
        return this.state.boards.find(b => b.id === this.state.activeBoard);
    }

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

    createColumn() {
        const newColumn = {
            boardId: this.state.activeBoard,
            title: `${this.state.columns.length + 1}. Column`,
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
