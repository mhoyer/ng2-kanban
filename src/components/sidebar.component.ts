import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {KanbanState, Board} from '../types';
import KanbanActions from '../kanban/kanban.ducks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sidebar',
    template: `
        <kanban-header (menuButtonClicked)="toggleExpandedState()"></kanban-header>
        <creator (create)="createBoard($event)"
                 class="board-creator"
                 [ngClass]="{expanded: isExpanded}"
                 placeholder="Board title">
        </creator>
        <board-selector [boards]="boards"
                        [activeBoard]="activeBoard"
                        [ngClass]="{expanded: isExpanded}"
                        (select)="selectBoard($event)">
        </board-selector>
    `,
})
export default class SidebarComponent {
    @Input() boards: Board[];
    @Input() activeBoard: string;
    isExpanded = false;

    constructor(private kanbanActions: KanbanActions) { }

    createBoard(title) {
        const newBoard = { title };
        this.kanbanActions.board.create(newBoard);
    }

    selectBoard(boardId: string) {
        this.kanbanActions.board.select(boardId);
    }

    toggleExpandedState() {
        this.isExpanded = !this.isExpanded;
    }
}
