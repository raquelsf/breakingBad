import { Injectable } from '@angular/core';
import {ApiService} from '../core/api.service';
import {RequestBuilder} from '../../interfaces/core/api-service/request-builder';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private entityName;

  constructor(private apiService: ApiService) {
  }

  public list(name = null,  loadingMode: ('circle' | 'loading_bar' | 'fullscreen' | 'none') = 'fullscreen'): Promise<any> {
    if (name) {
      this.entityName = `characters?name=${name}`;
    } else {
      this.entityName = `characters`;
    }

    return this.apiService
      .getBuilder({
        path: this.entityName,
        useAuthorization: true,
        loadingInfoMode: loadingMode
      } as RequestBuilder)
      .get()
      .then(res => {
        if (typeof res !== 'undefined') {
          return res;
        }

        throw Error('Erro ao listar Personagens');
      });
  }


  public getAll(loadingMode: ('circle' | 'loading_bar' | 'fullscreen' | 'none') = 'fullscreen'): Promise<any> {

    this.entityName = `characters`;

    return this.apiService
      .getBuilder({
        path: this.entityName,
        useAuthorization: true,
        loadingInfoMode: loadingMode
      } as RequestBuilder)
      .get()
      .then(res => {
        if (typeof res !== 'undefined') {
          return res;
        }

        throw Error('Erro ao listar Personagens');
      });
  }
}
