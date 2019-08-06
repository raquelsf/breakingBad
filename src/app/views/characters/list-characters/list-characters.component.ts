import {Component, OnInit} from '@angular/core';
import {CharactersService} from '../../../services/characters/characters.service';
import {Characters} from '../../../interfaces/characters/characters';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.scss']
})
export class ListCharactersComponent implements OnInit {
  public characters = [{} as Characters];
  public pagination = [];
  constructor(private charactersService: CharactersService, private translateService: TranslateService) {

  this.translateService.setDefaultLang('pt-br');
  }

  ngOnInit() {
    this.listCharacters();
    this.getPagination();
  }

  /**
   * Busca Personagens
   * @Input limit - limite de itens a serem buscaodos, offset - Inicio da busca
   **/

  listCharacters(limit = 8, offset = 1) {
    this.charactersService.list(limit, offset).then(res => {
      this.characters = res;
    });
  }

  /**
   * Busca Todos Personagens para contagem de itens a serem paginados
   **/
  getPagination() {
    this.charactersService.getAll().then(res => {
      const limit = 8;
      const total = res.length;
      let pages = total / limit;
      console.log(Math.ceil(pages));


      while (pages > 0) {
        this.pagination.push({
          limit: limit, offset: Math.ceil(limit * pages)
        });

        pages--;
      }
    });
    console.log(this.pagination);
  }

}
