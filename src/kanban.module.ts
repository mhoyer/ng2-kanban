import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideStore, Store} from '@ngrx/store';

import BoardComponent from './components/board.component';
import BoardHeaderComponent from './components/boardHeader.component';
import BoardSelectorComponent from './components/boardSelector.component';
import CardComponent from './components/card.component';
import ColumnComponent from './components/column.component';
import CreatorComponent from './components/creator.component';
import KanbanComponent from './components/kanban.component';
import KanbanHeaderComponent from './components/kanbanHeader.component';
import SidebarComponent from './components/sidebar.component';
import KanbanActions, {kanbanReducer, kanbanDispatchedActionsFactory} from './kanban/kanban.ducks';

const store = provideStore(kanbanReducer);
const dispatchedKanbanActions = {
    provide: KanbanActions,
    useFactory: kanbanDispatchedActionsFactory,
    deps: [Store]
};

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        BoardComponent,
        BoardHeaderComponent,
        BoardSelectorComponent,
        CardComponent,
        ColumnComponent,
        CreatorComponent,
        KanbanComponent,
        KanbanHeaderComponent,
        SidebarComponent
    ],
    bootstrap: [ KanbanComponent ],
    providers: [ store, dispatchedKanbanActions ]
})
export class KanbanModule { }
