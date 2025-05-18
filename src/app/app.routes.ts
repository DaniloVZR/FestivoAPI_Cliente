import { Routes } from '@angular/router';
import { InicioComponent } from '../features/components/inicio/inicio.component';
import { FestivoComponent } from '../features/components/festivo/festivo.component';
import { TiposComponent } from '../features/components/tipos/tipos.component';

export const routes: Routes = [
    { path: "inicio", component: InicioComponent },
    { path: "festivo", component: FestivoComponent },
    { path: "tipos", component: TiposComponent }
];
