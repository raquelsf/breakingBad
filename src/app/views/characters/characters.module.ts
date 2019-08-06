import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCharactersComponent } from './list-characters/list-characters.component';
import {RouterModule} from '@angular/router';
import {CharactersRoutes} from './characters.routing';

@NgModule({
  declarations: [ListCharactersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CharactersRoutes)
  ]
})
export class CharactersModule { }
