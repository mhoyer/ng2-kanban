import {Component, ChangeDetectionStrategy} from 'angular2/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kanban-header',
    template: `
        <header>
            <svg version="1.1" viewBox="0 0 500 500">
                <g>
                    <polygon fill="#B4B4B4" points="250,0 486,82 448,390    250,500   52,390 14,82"/>
                    <polygon fill="#A51E22" points="250,26 463,99 430,374   250,474   70,250"/>
                    <polygon fill="#DC2226" points="250,26                  250,474   70,374 37,99"/>
                    <polygon fill="#B4B4B4" points="250,40 401,367 344,367 312,291 250,291 180,271 250,249 296,249 230,95"/>
                    <polygon fill="#F3F3F3" points="250,40  99,367 156,367 186,291 250,291         250,249 204,249 250,140"/>
                </g>
            </svg>
            <h1>Kanban</h1>
            <button class="button-primary menu-button">
                &#9776;
            </button>
        </header>`,
})
export default class KanbanHeaderComponent { }