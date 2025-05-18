import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarFestivoComponent } from './verificar-festivo.component';

describe('VerificarFestivoComponent', () => {
  let component: VerificarFestivoComponent;
  let fixture: ComponentFixture<VerificarFestivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarFestivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarFestivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
