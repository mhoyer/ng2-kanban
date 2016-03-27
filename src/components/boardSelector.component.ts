import {Component, ChangeDetectionStrategy, EventEmitter, Input, Output} from 'angular2/core';
import {Board} from '../types.ts';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'board-selector',
    template: `
        <nav>
            <a href="#" class="button button-primary u-full-width"
               *ngFor="#board of boards"
               [ngClass]="cssActive(board.id)"
               (click)="selectBoard(board.id)">
               {{board.title}}
            </a>
        </nav>`,
})
export default class BoardSelectorComponent {
    @Input() boards: Board[];
    @Input() activeBoard: string;
    @Output() select = new EventEmitter<string>();

    cssActive(boardId) {
        if (boardId === this.activeBoard) {
            return 'button--active';
        }

        return '';
    }

    selectBoard(boardId: string) {
        this.select.emit(boardId);
    }
}