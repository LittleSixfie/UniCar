import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViajeComponent } from './search-viaje.component';

describe('SearchViajeComponent', () => {
  let component: SearchViajeComponent;
  let fixture: ComponentFixture<SearchViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
