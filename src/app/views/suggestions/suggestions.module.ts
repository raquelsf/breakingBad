import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSuggestionsComponent } from './form-suggestions/form-suggestions.component';
import {RouterModule} from '@angular/router';
import {SuggestionsRoutes} from './suggestions.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FormSuggestionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SuggestionsRoutes)
  ]
})
export class SuggestionsModule { }
