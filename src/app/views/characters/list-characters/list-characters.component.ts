import {Component, OnInit} from '@angular/core';
import {CharactersService} from '../../../services/characters/characters.service';
import {Characters} from '../../../interfaces/characters/characters';
import {TranslateService} from '@ngx-translate/core';
import {EventService} from '../../../services/core/event.service';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.scss']
})
export class ListCharactersComponent implements OnInit {
  public characters = [];
  public allCharacters = [{} as Characters];
  public pagination = [];

  constructor(private charactersService: CharactersService,
              private eventService: EventService,
              private translateService: TranslateService) {

    this.translateService.setDefaultLang('pt-br');
    this.subscribeSearch();
  }

  subscribeSearch() {
    this.eventService.search.subscribe((search) => {
      console.log(search);
      this.listCharacters(8, 1, search);
    });
  }

  ngOnInit() {
    this.listCharacters();
    this.getAll();
  }

  /**
   * Busca Personagens
   * @Input limit - limite de itens a serem buscaodos, offset - Inicio da busca
   **/

  listCharacters(limit = 8, offset = 1, name = null) {
    this.charactersService.list(limit, offset, name).then(res => {
      this.characters = res;
    });
  }

  /**
   * Busca Todos Personagens para contagem de itens a serem paginados
   **/
  getAll() {
    this.charactersService.getAll().then(
      res => {
        this.allCharacters = res;
        this.getPagination(res);
      });
  }

  getPagination(all) {
    const limit = 8;
    const total = all.length;
    let pages = total / limit;

    while (pages > 0) {
      this.pagination.push({
        limit: limit,
        offset: Math.ceil(limit * pages)
      });

      pages--;
    }

  }

  filterCharacters(status) {
    this.characters = [];
    // @ts-ignore
    this.allCharacters.findIndex(character => {
      if (character.status === status) {
        this.characters.push(character);
      }
    });

    this.pagination = [];

  }

}
