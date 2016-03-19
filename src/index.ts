import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {provideStore, Store} from '@ngrx/store';
import KanbanComponent from './components/kanban.component';
import KanbanActions, {kanbanReducer, kanbanDispatchedActionsFactory} from './kanban/kanban.ducks';

const store = provideStore(kanbanReducer);
const dispatchedKanbanActions = provide(KanbanActions, {
    useFactory: kanbanDispatchedActionsFactory,
    deps: [Store]}
);
bootstrap(KanbanComponent, [store, dispatchedKanbanActions]);

