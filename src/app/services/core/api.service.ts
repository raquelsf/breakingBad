import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {LoadingService} from './loading.service';
import {RequestBuilder} from '../../interfaces/core/api-service/request-builder';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})

export class ApiService {

  private url: string;
  private headers: HttpHeaders;
  private loadingInfoMode: string;

  static obj2queryStr(query: object = {}) {

    let queryString = '';

    Object.keys(query).forEach((queryParam, index) =>
      queryString += `${index === 0 ? '?' : '&'}${queryParam}=${typeof query[queryParam] === 'object'
        ? JSON.stringify(query[queryParam]) : query[queryParam].toString()}`
    );

    return queryString;
  }

  constructor(private http: HttpClient,
              private loadingService: LoadingService,
              private toastr: ToastrService) {
  }

  public getBuilder(builder: RequestBuilder): ApiService {

    /*Cria uma excecão de usagem de api entre (usa api de sugestoes)*/
    if (builder.path === 'breaking-bad/suggestions') {
      this.url = `${environment.suggestions}${builder.path}${ApiService.obj2queryStr(builder.query)}`;
    } else {
      this.url = `${environment.api}${builder.path}${ApiService.obj2queryStr(builder.query)}`;
    }

    this.loadingInfoMode = builder.loadingInfoMode;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    if ('headers' in builder) {
      Object.keys(builder.headers).forEach(header => this.headers = this.headers.append(header, builder.headers[header]));
    }

    return this;
  }

  private startRequestLoader() {
    if (this.loadingInfoMode !== 'none') {
      this.loadingService.start(this.loadingInfoMode);
    }
  }

  private stopRequestLoader() {
    this.loadingService.stop();
  }

  public get(): Promise<any> {

    this.startRequestLoader();

    return this.http
      .get(this.url, {headers: this.headers})
      .toPromise()
      .then((res) => {
        this.stopRequestLoader();
        return typeof res !== 'undefined' ? res : null;
      })
      .catch((ex: any) => {
        this.stopRequestLoader();
        throw ex;
      });
  }

  public post(data: Object): Promise<any> {

    this.startRequestLoader();

    return this.http
      .post(this.url, data, {headers: this.headers})
      .toPromise()
      .then((res: object) => {
        this.stopRequestLoader();
        return typeof res !== 'undefined' ? res : null;
      })
      .catch((ex: any) => {
        return ex;
      });
  }

}
