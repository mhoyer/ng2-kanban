import {Component, ChangeDetectionStrategy} from 'angular2/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kanban',
    template: `kanban`,
})
export default class KanbanComponent {
}