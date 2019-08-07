import {Injectable} from '@angular/core';
import {ApiService} from '../core/api.service';
import {RequestBuilder} from '../../interfaces/core/api-service/request-builder';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private entityName;

  constructor(private apiService: ApiService) {
  }

  public post(data, loadingMode: ('circle' | 'loading_bar' | 'fullscreen' | 'none') = 'fullscreen'): Promise<any> {

    this.entityName = `breaking-bad/suggestions`;

    return this.apiService
      .getBuilder({
        path: this.entityName,
        useAuthorization: true,
        loadingInfoMode: loadingMode
      } as RequestBuilder)
      .post(data)
      .then(res => {
        if (typeof res !== 'undefined') {
          return res;
        }

        throw Error('Sua sugestão não pode ser enviada agora. Tente mais tarde.');
      });
  }

}
