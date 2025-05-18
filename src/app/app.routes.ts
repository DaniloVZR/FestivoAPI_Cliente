import { Routes } from '@angular/router';
import { InicioComponent } from '../features/components/inicio/inicio.component';
import { FestivoComponent } from '../features/components/festivo/festivo.component';
import { TiposComponent } from '../features/components/tipo/tipo.component';
import { VerFestivosComponent } from '../features/components/ver-festivos/ver-festivos.component';
import { VerificarFestivoComponent } from '../features/components/verificar-festivo/verificar-festivo.component';

export const routes: Routes = [
    { path: "inicio", component: InicioComponent },
    { path: "festivo", component: FestivoComponent },
    { path: "tipos", component: TiposComponent },
    { path: "festivos-year", component: VerFestivosComponent },
    { path: "verificar-festivo", component: VerificarFestivoComponent }
];
