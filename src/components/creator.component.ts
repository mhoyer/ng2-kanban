import {Component, ChangeDetectionStrategy, EventEmitter, Input, Output} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'creator',
    template: `
        <input #input type="text"
               [placeholder]="placeholder"
               [value]="value"
               (keydown)="inputKeyDown($event)">
        <button class="button-primary" (click)="createButtonClick($event, input)">
            Create
        </button>`,
})
export default class CreatorComponent {
    @Input() placeholder: string;
    @Input() value: string = '';
    @Output() create = new EventEmitter<string>();

    createButtonClick(event: MouseEvent, input: HTMLInputElement) {
        event.preventDefault();
        this.doCreate(input);
    }

    inputKeyDown(event: KeyboardEvent) {
        if (event.keyCode !== 13) return;
        this.doCreate(event.target as HTMLInputElement);
    }

    doCreate(input: HTMLInputElement) {
        if (input.value && input.value.trim()) {
            this.create.emit(input.value);
            input.value = '';
        }
    }
}
