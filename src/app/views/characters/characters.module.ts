import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCharactersComponent } from './list-characters/list-characters.component';
import {RouterModule} from '@angular/router';
import {CharactersRoutes} from './characters.routing';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ListCharactersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CharactersRoutes)
  ]
})
export class CharactersModule { }
