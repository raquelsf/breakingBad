import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEpidodesComponent } from './list-epidodes/list-epidodes.component';
import {RouterModule} from '@angular/router';
import {EpisodesRoutes} from './episodes.routing';



@NgModule({
  declarations: [ListEpidodesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EpisodesRoutes)
  ]
})
export class EpisodesModule { }
