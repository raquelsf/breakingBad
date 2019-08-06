import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorComponent} from './views/error/error.component';
import {BaseComponent} from './layout/base/base.component';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {ToastrModule} from 'ngx-toastr';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule} from '@angular/common';

import {registerLocaleData} from '@angular/common';
import localePT from '@angular/common/locales/pt-PT';
import {LoadingService} from './services/core/loading.service';
import {ApiService} from './services/core/api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SidebarModule} from 'ng-sidebar';
import {MenuItens} from './layout/base/menu-itens';
import {FormsModule} from '@angular/forms';

// import { GlobalErrorHandler } from './classes/core/global-error-handler';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

registerLocaleData(localePT, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      }
    }),
    LoadingBarModule,
    SidebarModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    // {
    //   provide : ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    {
      provide: LOCALE_ID,
      useValue: 'pt_PT'
    },
    ApiService,
    LoadingService,
    MenuItens
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
