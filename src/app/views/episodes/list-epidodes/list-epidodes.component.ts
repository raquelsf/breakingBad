import { Component, OnInit } from '@angular/core';
import {EpisodesService} from '../../../services/episodes/episodes.service';
import {Episodes} from '../../../interfaces/episodes/episodes';

@Component({
  selector: 'app-list-epidodes',
  templateUrl: './list-epidodes.component.html',
  styleUrls: ['./list-epidodes.component.scss']
})
export class ListEpidodesComponent implements OnInit {
  public pagination = [];
  public allEpisodes = [];
  public episodes = [{} as Episodes];

  constructor(private episodesService: EpisodesService) { }


  ngOnInit() {
    this.listEpisodes();
    this.getAll();
  }

  /**
   * Busca Personagens
   * @Input limit - limite de itens a serem buscaodos, offset - Inicio da busca
   **/

  listEpisodes(limit = 6, offset = 1, name = null) {
    this.episodesService.list(limit, offset, name).then(res => {
      this.episodes = res;
    });
  }

  /**
   * Busca Todos Personagens para contagem de itens a serem paginados
   **/
  getAll() {
    this.episodesService.getAll().then(
      res => {
        this.allEpisodes = res;
        this.getPagination(res);
      });
  }

  getPagination(all) {
    const limit = 6;
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

}
