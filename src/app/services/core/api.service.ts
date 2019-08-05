import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {LoadingService} from './loading.service';
import {RequestBuilder} from '../../interfaces/core/api-service/request-builder';
import { ToastrService } from 'ngx-toastr';

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

    this.url = `${environment.api}${builder.path}${ApiService.obj2queryStr(builder.query)}`;

    this.loadingInfoMode = builder.loadingInfoMode;

    this.url = `${environment.api}${builder.path}${ApiService.obj2queryStr(builder.query)}`;

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
        this.handleErrors(ex);
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
        this.stopRequestLoader();
        this.handleErrors(ex);
        throw ex;
      });
  }

  public put(data: Object): Promise<any> {

    this.startRequestLoader();

    return this.http
      .put(this.url, data, {headers: this.headers})
      .toPromise()
      .then((res) => {
        this.stopRequestLoader();
        return typeof res !== 'undefined' ? res : null;
      })
      .catch((ex: any) => {
        this.stopRequestLoader();
        this.handleErrors(ex);
        throw ex;
      });
  }

  public delete(): Promise<any> {

    this.startRequestLoader();

    return this.http
      .delete(this.url, {headers: this.headers})
      .toPromise()
      .then((res) => {
        this.stopRequestLoader();
        return typeof res !== 'undefined' ? res : null;
      })
      .catch((ex: any) => {
        this.stopRequestLoader();
        this.handleErrors(ex);
        throw ex;
      });
  }
  private handle401Errors(error: any) {

    if ('data' in error) {
      return;
    }

    if ('error' in error) {
      switch (error.error) {
        case 'invalid_token':
          this.toastr.warning('Suas credenciais estāo inválidas, por favor, faça login novamente');
          // this.authService.logout();
          break;
        case 'expired_token':
          this.toastr.warning('Suas credenciais expiraram, por favor, faça login novamente');
          // this.authService.logout();
          break;
        case 'not_authorized':
          this.toastr.error('Você nāo tem permissāo para acessar este recurso');
          break;
        case 'authorization_missing':
          this.toastr.error('Este recurso requer autorizaçāo');
          break;
        default:
          console.log(error);
          this.toastr.error('Nāo autorizado (verifique console)');
      }
      return;
    }

    if ('message' in error) {
      this.toastr.error(error.message);
    } else {
      this.toastr.error('401 - Erro desconhecido (verifique console)');
    }
  }

  private handle403Errors(error: any) {

    if ('data' in error) {
      return;
    }

    if ('error' in error) {
      switch (error.error) {
        case 'api_not_enabled':
          this.toastr.warning('Esta API está desativada no momento');
          break;
        case 'resource_not_enabled':
          this.toastr.warning('Este endpoint está desativado no momento');
          break;
        default:
          console.log(error);
          this.toastr.error('Recurso desativado (verifique console)');
      }
      return;
    }

    if ('message' in error) {
      this.toastr.error(error.message);
    } else {
      this.toastr.error('403 - Erro desconhecido (verifique console)');
    }
  }

  private handle404Errors(error: any) {

    if ('data' in error) {
      return;
    }

    if ('error' in error) {
      switch (error.error) {
        case 'resource_not_found' :
          this.toastr.error('Este recurso nāo existe');
          break;
        case 'api_not_found' :
          this.toastr.error('Esta API nāo existe');
          break;
        default:
          console.log(error);
          this.toastr.error('Recurso nāo encontrado (verifique console)');
      }
      return;
    }

    if ('message' in error) {
      this.toastr.error(error.message);
    } else {
      this.toastr.error('404 - Erro desconhecido (verifique o console)');
    }
  }

  private handle408Errors(error: any) {

    if ('data' in error) {
      return;
    }

    if ('error' in error) {
      switch (error.error) {
        case 'request_time_out' :
          this.toastr.error('Tempo máximo de execuçāo atingido, tente novamente.');
          break;
        default:
          console.log(error);
          this.toastr.error('Timeout (verifique console)');
      }
      return;
    }

    if ('message' in error) {
      this.toastr.error(error.message);
    } else {
      this.toastr.error('408 - Timeout (verifique o console)');
    }
  }

  private handle422Errors(error: any) {
    if ('data' in error) {
      error.data.forEach(err => this.toastr.error(err.message));
    } else {
      console.log(error);
      this.toastr.error('422 - Erro de validaçāo de corpo desconhecido (verifique o console)');
    }
  }

  private handle500Errors(error: any) {
    if ('data' in error) {
      if (typeof error.data === 'object' && 'errors' in error.data) {
        Object.keys(error.data.errors).forEach(errName => this.toastr.error(error.data.errors[errName].message));
      } else if (typeof error.data === 'string' && error.data.length) {
        this.toastr.error(error.data);
      } else if (error.data instanceof Array && error.data.length) {
        error.data.forEach(err => this.toastr.error(err.toString()));
      } else {
        console.log(error);
        this.toastr.error('500 - Erro interno desconhecido (verifique o console)');
      }

    } else {
      console.log(error);
      this.toastr.error('500 - Erro interno desconhecido (verifique o console)');
    }
  }

  private handle503Errors(error: any) {

    if ('data' in error) {
      return;
    }

    if ('error' in error) {
      switch (error.error) {
        case 'api_unavailable' :
          this.toastr.error('Este serviço está sob manutençāo ou indisponível no momento, tente mais tarde.');
          break;
        default:
          console.log(error);
          this.toastr.error('Serviço indisponível (verifique console)');
      }
      return;
    }

    if ('message' in error) {
      this.toastr.error(error.message);
    } else {
      this.toastr.error('503 - Erro desconhecido (verifique o console)');
    }
  }

  private handleErrors(exception: any): void {

    switch (exception.status) {
      case 0:
        this.toastr.error('Sem conexāo com o servidor');
        break;
      case 401:
        this.handle401Errors(exception.error);
        break;
      case 403:
        this.handle403Errors(exception.error);
        break;
      case 404:
        this.handle404Errors(exception.error);
        break;
      case 408:
        this.handle408Errors(exception.error);
        break;
      case 422:
        this.handle422Errors(exception.error);
        break;
      case 500:
        this.handle500Errors(exception.error);
        break;
      case 503:
        this.handle503Errors(exception.error);
        break;
      default:
        console.log(exception);
        this.toastr.error('Erro desconhecido, contate o administrador (verifique o console)');
        break;
    }
  }

}
