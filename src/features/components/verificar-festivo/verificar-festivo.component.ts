import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FestivoService } from '../../../core/services/festivo.service';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';

@Component({
  selector: 'app-verificar-festivo',
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './verificar-festivo.component.html',
  styleUrl: './verificar-festivo.component.css'
})
export class VerificarFestivoComponent {
  public fechaSeleccionada: Date | null = null;
  public esFestivo: boolean | null = null;

  constructor(private servicioFestivo: FestivoService) { }

  public verificarFestivo() {
    if (!this.fechaSeleccionada) return;

    const year = this.fechaSeleccionada.getFullYear();
    const mes = this.fechaSeleccionada.getMonth() + 1; 
    const dia = this.fechaSeleccionada.getDate();

    this.servicioFestivo.verificarFestivo(year, mes, dia).subscribe({
      next: (resultado: boolean) => {
        this.esFestivo = resultado;        
      },
      error: err => {
        alert('Error al consultar festivo: ' + err.message);        
      }
    });
  }
}
