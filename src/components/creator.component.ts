import {Component, ChangeDetectionStrategy, EventEmitter, Input, Output} from 'angular2/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'creator',
    template: `     
        <input #input type="text" 
               [placeholder]="placeholder"
               [value]="value">
        <button class="button-primary" (click)="doCreate($event, input)">
            Create
        </button>`,
})
export default class CreatorComponent {
    @Input() placeholder: string;
    @Input() value: string = '';
    @Output() create = new EventEmitter<string>();

    doCreate(event: MouseEvent, input: HTMLInputElement) {
        event.preventDefault();

        if (input.value && input.value.trim()) {
            this.create.emit(input.value);
            input.value = '';
        }
    }
}