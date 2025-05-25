import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modules/referencias-material.module';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    ReferenciasMaterialModule,
    NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FestivosAPIClient';

public opciones=[
  {titulo: "Gestionar Festivos", url:"festivo"},
  {titulo: "Tipo de Festivos", url:"tipos"},
  {titulo: "Festivos por Año", url:"festivos-year"},
  {titulo: "Verificar Festivos", url:"verificar-festivo"},
]

}
