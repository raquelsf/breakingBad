import { Routes } from '@angular/router';
import {ListCharactersComponent} from './list-characters/list-characters.component';

export const CharactersRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: ListCharactersComponent
      }
    ]
  }
];
