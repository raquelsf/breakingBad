import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './views/error/error.component';
import {BaseComponent} from './layout/base/base.component';

const routes: Routes = [
  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        loadChildren: './views/characters/characters.module#CharactersModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
