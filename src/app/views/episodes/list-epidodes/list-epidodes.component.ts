import {Component, OnInit} from '@angular/core';
import {EpisodesService} from '../../../services/episodes/episodes.service';
import {Episodes} from '../../../interfaces/episodes/episodes';
import {EventService} from '../../../services/core/event.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CharactersService} from '../../../services/characters/characters.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-list-epidodes',
  templateUrl: './list-epidodes.component.html',
  styleUrls: ['./list-epidodes.component.scss']
})
export class ListEpidodesComponent implements OnInit {
  public episodes = [{} as Episodes];
  public allEpisodes = [{} as Episodes];
  public page = 1;
  public character;

  constructor(private episodesService: EpisodesService,
              private eventService: EventService,
              private charactersService: CharactersService,
              private modalService: NgbModal,
              private translateService: TranslateService) {

    this.translateService.setDefaultLang('pt-br');
    this.subscribeSearch();
  }

  subscribeSearch() {
    this.eventService.search.subscribe((search) => {
      this.searchEpisodes(search);
    });
  }


  ngOnInit() {
    this.listEpisodes();
  }

  /**
   * Busca Episodios
   *
   **/

  listEpisodes(name = null) {
    this.episodesService.list(name).then(res => {
      this.episodes = res;
      this.allEpisodes = res;
    });
  }

  searchEpisodes(status) {
    this.episodes = [];
    // @ts-ignore
    this.allEpisodes.findIndex(episode => {
      if (episode.title === status) {
        this.episodes.push(episode);
      }
    });

  }

  openModal(content, character) {
    this.charactersService.list(character).then(res => {
      this.character = res[0];

      if (res.length) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

    });

  }

}
