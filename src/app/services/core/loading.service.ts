import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({providedIn: 'root'})

export class LoadingService {

  public bar_color = '#362ab7';

  constructor(private loadingBarService: LoadingBarService) {
  }

  start(mode: string = 'loading_bar'): void {
    switch (mode) {
      case 'circle':
        document.getElementById('circle-loader').style.display = 'block';
        break;
      case 'fullscreen':
        document.getElementById('fullscreen-loader').style.display = 'block';
        break;
      case 'loading_bar':
        this.loadingBarService.start();
        break;
    }
  }

  stop(): void {
    document.getElementById('fullscreen-loader').style.display = 'none';
    document.getElementById('circle-loader').style.display     = 'none';
    this.loadingBarService.complete();
  }
}
