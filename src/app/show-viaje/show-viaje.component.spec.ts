import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowViajeComponent } from './show-viaje.component';

describe('ShowViajeComponent', () => {
  let component: ShowViajeComponent;
  let fixture: ComponentFixture<ShowViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
