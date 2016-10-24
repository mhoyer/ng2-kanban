import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';

import {Card, Column, KanbanState} from '../types';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'column',
    template: `
        <h3>{{column.title}}</h3>
        <input [value]="column.title" #columnTitleEditor />
        <button (click)="renameColumn(columnTitleEditor.value)">Rename</button>
        <button (click)="deleteColumn()">Delete Column</button> |
        <button (click)="createCard()">Create Card</button>
        <card *ngFor="let card of cards; trackBy: trackByCardId" [card]="card"></card>
`,
})
export default class ColumnComponent {
    state: KanbanState;
    trackByCardId = (idx, card) => card.id;
    @Input() column: Column;

    constructor(store: Store<KanbanState>, private kanbanActions: KanbanActions) {
        store.subscribe(s => this.state = s);
    }

    get cards() {
        return this.state.cards.filter(c => c.columnId === this.column.id);
    };

    renameColumn(title) {
        const columnId = this.column.id;
        this.kanbanActions.column.rename({ columnId, title });
    }

    deleteColumn() {
        this.kanbanActions.column.delete(this.column.id);
    }

    createCard() {
        const newCard = {
            columnId: this.column.id,
            title: `${10 + (Math.random() * 89 & 100)}`,
            description: `${100 + (Math.random() * 899 & 1000)}`
        };
        this.kanbanActions.card.create(newCard);
    }
}
