import { Routes } from '@angular/router';
import {ListEpidodesComponent} from './list-epidodes/list-epidodes.component';

export const EpisodesRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: ListEpidodesComponent
      }
    ]
  }
];
