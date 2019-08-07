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
  public page;
  public search;

  constructor(private charactersService: CharactersService,
              private eventService: EventService,
              private translateService: TranslateService) {

    this.translateService.setDefaultLang('pt-br');
    this.subscribeSearch();
  }

  subscribeSearch() {
    this.eventService.search.subscribe((search) => {
      this.listCharacters(search);
      this.search = search;
    });
  }

  ngOnInit() {
    this.listCharacters();
  }

  /**
   * Busca Personagens
   * @Input limit - limite de itens a serem buscaodos, offset - Inicio da busca
   **/

  listCharacters(name = null) {
    this.charactersService.list(name).then(res => {
      this.characters = res;
      this.allCharacters = res;

    });
  }

  filterCharacters(status) {
    this.characters = [];
    // @ts-ignore
    this.allCharacters.findIndex(character => {
      if (character.status === status) {
        this.characters.push(character);
      }
    });

  }

}
