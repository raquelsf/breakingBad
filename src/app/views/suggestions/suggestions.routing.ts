import { Routes } from '@angular/router';
import {FormSuggestionsComponent} from './form-suggestions/form-suggestions.component';

export const SuggestionsRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: FormSuggestionsComponent
      }
    ]
  }
];
