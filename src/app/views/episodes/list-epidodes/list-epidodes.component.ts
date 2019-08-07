import { Component, OnInit } from '@angular/core';
import {EpisodesService} from '../../../services/episodes/episodes.service';
import {Episodes} from '../../../interfaces/episodes/episodes';
import {EventService} from '../../../services/core/event.service';

@Component({
  selector: 'app-list-epidodes',
  templateUrl: './list-epidodes.component.html',
  styleUrls: ['./list-epidodes.component.scss']
})
export class ListEpidodesComponent implements OnInit {
  public episodes = [{} as Episodes];
  public allEpisodes = [{} as Episodes];
  public page = 1;
  constructor(private episodesService: EpisodesService, private eventService: EventService) {
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

  listEpisodes( name = null) {
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
}
