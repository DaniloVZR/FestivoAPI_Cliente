import { Component, Inject } from '@angular/core';
import {ITipo} from '../../../shared/entidades/tipo'
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DatosEdicionTipo {
  encabezado: string;
  tipo: ITipo;
}

@Component({
  selector: 'app-tipo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './tipo-editar.component.html',
  styleUrl: './tipo-editar.component.css'
})
export class TipoEditarComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionTipo,
    private referenciaDialogo: MatDialogRef<TipoEditarComponent>) {

  }

  public cerrar() {
    this.referenciaDialogo.close();
  }

}