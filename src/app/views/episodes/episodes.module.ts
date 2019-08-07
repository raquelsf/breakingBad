import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEpidodesComponent } from './list-epidodes/list-epidodes.component';
import {RouterModule} from '@angular/router';
import {EpisodesRoutes} from './episodes.routing';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ListEpidodesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModalModule,
    SharedModule,
    RouterModule.forChild(EpisodesRoutes)
  ],
  // entryComponents: [NgbModalModule]
})
export class EpisodesModule { }
