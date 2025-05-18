import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../../shared/modules/referencias-material.module';
import { IFestivo } from '../../../shared/entidades/festivo';
import { ITipo } from '../../../shared/entidades/tipo';

export interface DatosEdicionFestivo {
  encabezado: string,
  festivo: IFestivo,
  tipos: ITipo[]
}

@Component({
  selector: 'app-festivo-editar',
  imports: [ReferenciasMaterialModule, FormsModule, NgFor],
  templateUrl: './festivo-editar.component.html',
  styleUrl: './festivo-editar.component.css'
})
export class FestivoEditarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo, private referenciaDialogo: MatDialogRef<FestivoEditarComponent>){

  }

  public cerrar(){
    this.referenciaDialogo.close();
  }
}
