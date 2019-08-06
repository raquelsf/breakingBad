import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  /**
   * Evento disparado para mostrar resumo de faturas em financeiro
   **/
  public search = new EventEmitter();


  constructor() { }

}
