import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEpidodesComponent } from './list-epidodes/list-epidodes.component';
import {RouterModule} from '@angular/router';
import {EpisodesRoutes} from './episodes.routing';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [ListEpidodesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(EpisodesRoutes)
  ]
})
export class EpisodesModule { }
