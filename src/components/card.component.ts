import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState, Card, KanbanState} from '../types';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'card',
    template: `
        <h4>{{card.title}}</h4>
        <p>{{card.description}}</p>
        <input [value]="card.title" #cardTitleEditor />
        <input [value]="card.description" #cardDescriptionEditor />
        <button (click)="updateCard(card.id, cardTitleEditor.value, cardDescriptionEditor.value)">Update</button>
        <button (click)="deleteCard(card.id)">Delete</button>
`,
})
export default class CardComponent {
    state: KanbanState;
    @Input() card: Card;

    constructor(store: Store<AppState>, private kanbanActions: KanbanActions) {
        store.select(s => s.kanban).subscribe(s => this.state = s);
    }

    updateCard(cardId, title, description) {
        this.kanbanActions.card.update({ cardId, title, description });
    }

    deleteCard(cardId) {
        this.kanbanActions.card.delete(cardId);
    }
}
