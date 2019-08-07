import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuggestionsComponent } from './form-suggestions.component';

describe('FormSuggestionsComponent', () => {
  let component: FormSuggestionsComponent;
  let fixture: ComponentFixture<FormSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
