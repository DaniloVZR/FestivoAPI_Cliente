import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { IFestivo } from '../../../shared/entidades/festivo';
import { FestivoService } from '../../../core/services/festivo.service';
import { FestivoEditarComponent } from '../festivo-editar/festivo-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { ITipo } from '../../../shared/entidades/tipo';
import { TipoService } from '../../../core/services/tipo.service';
import { FormsModule } from '@angular/forms';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';

@Component({
  selector: 'app-festivo',
  imports: [ReferenciasMaterialModule, NgxDatatableModule, FormsModule],
  templateUrl: './festivo.component.html',
  styleUrl: './festivo.component.css'
})
export class FestivoComponent implements OnInit {
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public readonly TAMANO: number = 10;

  public opcionBusqueda: number = -1;
  public opcionesBusqueda: string[] = ["Nombre", "Tipo"];
  public textoBusqueda: string = "";

  public tipos: ITipo[] = []
  public festivos: IFestivo[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Dia", prop: "dia" },
    { name: "Mes", prop: "mes" },
    { name: "Tipo Festivo", prop: "tipoFestivo.descripcion" },
  ];
  public modoColumna = ColumnMode;
  public tipoTipo = SelectionType;
  public festivoEscogido: IFestivo | undefined;
  public indiceFestivoEscogido: number = -1;

  constructor(private servicioFestivo: FestivoService, private servicioTipo: TipoService, private servicioDialogo: MatDialog) { }

  ngOnInit(): void {
    this.listar(-1);
    this.listarTipos();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.festivoEscogido = event.row;
      this.indiceFestivoEscogido = this.festivos.findIndex(festivo => festivo == this.festivoEscogido);
    }
  }

  public listarTipos() {
    this.servicioTipo.listar().subscribe({
      next: response => {
        this.tipos = response
      },
      error: error => {
        window.alert(error.message);
      }
    })
  }

  public listar(idBuscado: number) {
    this.servicioFestivo.listar().subscribe({
      next: response => {
        this.festivos = response;
        if (idBuscado > 0) {
          this.indiceFestivoEscogido = this.festivos.findIndex(festivo => festivo.id == idBuscado);
          this.festivoEscogido = this.festivos[this.indiceFestivoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceFestivoEscogido / this.TAMANO);
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public modificar() {
    if (this.festivoEscogido) {
      const dialogo = this.servicioDialogo.open(FestivoEditarComponent, {
        width: "500px",
        height: "400px",
        data: {
          encabezado: `Modificando el festivo ${this.festivoEscogido.nombre}`,
          festivo: { ...this.festivoEscogido },
          tipos: this.tipos
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioFestivo.modificar(datos.festivo).subscribe({
              next: response => {
                this.festivos[this.indiceFestivoEscogido] = response;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el festivo a modificar");
    }
  }

  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.servicioFestivo.buscar(this.textoBusqueda).subscribe(
        {
          next: response => {
            this.festivos = response;
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
    else {
      this.listar(-1);
    }
  }

  public verificarEliminar() {
    if (this.festivoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el festivo ${this.festivoEscogido.nombre} ?`,
          id: this.festivoEscogido.id
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioFestivo.eliminarFestivo(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar(-1);
                  window.alert("festivo eliminado con éxito");
                } else {
                  window.alert("No se pudo eliminar el festivo");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      window.alert("Debe escoger el festivo a eliminar");
    }
  }

  public agregar() {
    const dialogo = this.servicioDialogo.open(FestivoEditarComponent, {
      width: "500px",
      height: "400px",
      data: {
        encabezado: "Agregando un nuevo festivo",
        festivo: {
          id: 0,
          nombre: "",
          dia: 0,
          mes: 0,
          diaPascua: 0,
          tipoId: 1
        },
        tipos: this.tipos
      },
      disableClose: true,
    });

    dialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.servicioFestivo.agregar(datos.festivo).subscribe({
            next: response => {
              this.listar(response.id);
            },
            error: error => {
              window.alert(error.error);
            }
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }
}