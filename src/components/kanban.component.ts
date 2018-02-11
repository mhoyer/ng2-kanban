import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, KanbanState} from '../types';
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
    constructor(store: Store<AppState>, private kanbanActions: KanbanActions) {
        const kanbanState$ = store.select(x => x.kanban);
        kanbanState$.subscribe(s => this.state = s);
    }

    get debugState() {
        return JSON.stringify(this.state, null, 2);
    }

    get selectedBoard() {
        return this.state.boards.find(b => b.id === this.state.activeBoard);
    }
}
