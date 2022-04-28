import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateViajeComponent } from './update-viaje.component';

describe('UpdateViajeComponent', () => {
  let component: UpdateViajeComponent;
  let fixture: ComponentFixture<UpdateViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
