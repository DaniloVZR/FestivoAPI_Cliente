import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { TipoService } from '../../../core/services/tipo.service';
import {ITipo} from '../../../shared/entidades/tipo'
import { TipoEditarComponent } from '../tipo-editar/tipo-editar.component';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';


@Component({
  selector: 'app-tipo',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
  ],
 templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css'
})
export class TiposComponent implements OnInit {
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;

  public textoBusqueda: string = "";

  public tipos: ITipo[] = [];
  public columnas = [
    { name: "indice", prop: "id" },
    { name: "tipo", prop: "descripcion" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public tipoEscogido: ITipo | undefined;
  public indiceTipoEscogido: number = -1;


  constructor(private servicioTipo: TipoService,
    private servicioDialogo: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.listar(-1);
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.tipoEscogido = event.row;
      this.indiceTipoEscogido = this.tipos.findIndex(tipo => tipo == this.tipoEscogido);
    }
  }

  public listar(idBuscado: number) {
    this.servicioTipo.listar().subscribe({
      next: response => {
        this.tipos = response;
        if (idBuscado > 0) {
          this.indiceTipoEscogido = this.tipos.findIndex(tipo => tipo.id == idBuscado);
          this.tipoEscogido = this.tipos[this.indiceTipoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceTipoEscogido / 10);
          });

        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public modificar() {
    if (this.tipoEscogido) {
      const dialogo = this.servicioDialogo.open(TipoEditarComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `Modicando el tipo ${this.tipoEscogido.id}`,
          tipo: this.tipoEscogido
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioTipo.modificar(datos.tipo).subscribe({
              next: response => {
                this.tipos[this.indiceTipoEscogido] = response;
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
      window.alert("Debe escoger el Tipo a modificar");
    }
  }

public verificarEliminar() {
    if (this.tipoEscogido) {
      const dialogo = this.servicioDialogo.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `¿Está seguro de eliminar el Tipo ${this.tipoEscogido.descripcion}?`,
          id: this.tipoEscogido.id
        },
        disableClose: true,
      });
      dialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.servicioTipo.eliminarFestivo(datos.id).subscribe({
              next: response => {
                this.listar(-1);
                window.alert("Tipo eliminado con éxito");
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
      window.alert("Debe escoger el Tipo a eliminar");
    }
  }


  public buscar() {
    if (this.textoBusqueda.length > 0) {
      this.servicioTipo.buscar(this.textoBusqueda).subscribe(
        {
          next: response => {
            this.tipos = response;
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

  public agregar() {
    const dialogo = this.servicioDialogo.open(TipoEditarComponent, {
      width: "500px",
      height: "300px",
      data: {
        encabezado: "Agregando un nuevo Tipo",
        tipo: {
          id: 0,
          descripcion: ""
        }
      },
      disableClose: true,
    });
    dialogo.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.servicioTipo.agregar(datos.tipo).subscribe({
            next: response => {
              this.listar(response.id);
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



}
