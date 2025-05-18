import { Component, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FestivoService } from '../../../core/services/festivo.service';
import { FormsModule } from '@angular/forms';
import { IFechaFestivo } from '../../../shared/dto/fechaFestivo';

@Component({
  selector: 'app-ver-festivos',
  imports: [ReferenciasMaterialModule, NgxDatatableModule, FormsModule],
  templateUrl: './ver-festivos.component.html',
  styleUrl: './ver-festivos.component.css'
})
export class VerFestivosComponent {
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public readonly TAMANO: number = 10;

  public opcionBusqueda: number = -1;
  public textoBusqueda: string = "";

  public fechasFestivos: IFechaFestivo[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Fecha", prop: "fecha" }
  ];

  public modoColumna = ColumnMode;
  public tipoTipo = SelectionType;  
  public indiceFestivoEscogido: number = -1;

  constructor(private servicioFestivo: FestivoService) {}

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.servicioFestivo.obtenerFestivosAno(+this.textoBusqueda).subscribe(
        {
          next: response => {
            this.fechasFestivos = response.map(f => ({
              nombre: f.nombre,
              fecha: this.formatearFecha(f.fecha)
            }))            
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
  }

  private formatearFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
}

