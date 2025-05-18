import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFestivosComponent } from './ver-festivos.component';

describe('VerFestivosComponent', () => {
  let component: VerFestivosComponent;
  let fixture: ComponentFixture<VerFestivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerFestivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerFestivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
