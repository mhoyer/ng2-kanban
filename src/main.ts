import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { KanbanModule } from './kanban.module';

import './style.css';

platformBrowserDynamic().bootstrapModule(KanbanModule);
