import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {KanbanState} from '../types';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kanban',
    template: `
        <sidebar [boards]="state.boards"
                 [activeBoard]="state.activeBoard">
        </sidebar>
        <board [board]="selectedBoard"></board>`,
})
export default class KanbanComponent {
    state: KanbanState;
    constructor(store: Store<KanbanState>, private kanbanActions: KanbanActions) {
        store.subscribe(s => this.state = s);
        store.subscribe(s => console.log(this.debugState));
    }

    get debugState() {
        return JSON.stringify(this.state, null, 2);
    }

    get selectedBoard() {
        return this.state.boards.find(b => b.id === this.state.activeBoard);
    }
}
