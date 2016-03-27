import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Store} from '@ngrx/store';
import {KanbanState} from '../types';
import SidebarComponent from '../components/sidebar.component';
import BoardComponent from '../components/board.component';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kanban',
    directives: [SidebarComponent, BoardComponent],
    template: `
        <sidebar [boards]="state.boards" 
                 [activeBoard]="state.activeBoard">
        </sidebar>
        <board [board]="selectedBoard"></board>
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
        return this.state.boards.find(b => b.id === this.state.activeBoard);
    }
}
