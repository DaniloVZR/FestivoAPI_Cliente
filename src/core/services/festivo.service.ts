import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IFestivo } from '../../shared/entidades/festivo';

@Injectable({
  providedIn: 'root'
})

export class FestivoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}/festivos`;
  }

  public listar(): Observable<IFestivo[]> {
    return this.http.get<IFestivo[]>(`${this.url}/listar`);
  }

  public obtenerFestivo(id: number): Observable<IFestivo[]> {
    return this.http.get<IFestivo[]>(`${this.url}/obtener/${id}`);
  }

  public buscar(dato: string): Observable<IFestivo[]> {
    return this.http.get<IFestivo[]>(`${this.url}/buscar/${dato}`);
  }

  public agregar(festivo: IFestivo): Observable<IFestivo> {
    return this.http.post<IFestivo>(`${this.url}/agregar`, festivo);
  }

  public modificar(festivo: IFestivo): Observable<IFestivo> {
    return this.http.put<IFestivo>(`${this.url}/modificar`, festivo);
  }

  public eliminarFestivo(id: number): Observable<IFestivo[]> {
    return this.http.delete<IFestivo[]>(`${this.url}/eliminar/${id}`);
  }

  public obtenerFestivosAno(year: number): Observable<IFestivo[]> {
    return this.http.get<IFestivo[]>(`${this.url}/listar/${year}`);
  }

  public verificarFestivo(year: number, mes: number, dia: number): Observable<IFestivo[]> {
    return this.http.get<IFestivo[]>(`${this.url}/Verificar/${year}/${mes}/${dia}`);
  }
}
