import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingService} from '../../services/core/loading.service';
import {MenuItens} from './menu-itens';
import {SidebarModule} from 'ng-sidebar';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  isShown:boolean=false;
}
