import {Component} from '@angular/core';
import {EventService} from '../../services/core/event.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  isShown:boolean=false;
  search;

  constructor(private eventService: EventService) {}

  onSubmit() {
    this.eventService.search.emit(this.search);
  }
}
