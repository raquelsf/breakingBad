import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEpidodesComponent } from './list-epidodes.component';

describe('ListEpidodesComponent', () => {
  let component: ListEpidodesComponent;
  let fixture: ComponentFixture<ListEpidodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEpidodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEpidodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
