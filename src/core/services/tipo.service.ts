import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ITipo } from '../../shared/entidades/tipo';

@Injectable({
  providedIn: 'root'
})

export class TipoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}/tipos`;
   }

   public listar(): Observable<ITipo[]> {
       return this.http.get<ITipo[]>(`${this.url}/listar`);
     }
   
     public obtenerTipo(id: number): Observable<ITipo[]> {
       return this.http.get<ITipo[]>(`${this.url}/obtener/${id}`);
     }
   
     public buscar(dato: string): Observable<ITipo[]> {
       return this.http.get<ITipo[]>(`${this.url}/buscar/${dato}`);
     }
   
     public agregar(festivo: ITipo): Observable<ITipo> {
       return this.http.post<ITipo>(`${this.url}/agregar`, festivo);
     }
   
     public modificar(festivo: ITipo): Observable<ITipo> {
       return this.http.post<ITipo>(`${this.url}/modificar`, festivo);
     }
   
     public eliminarFestivo(id: number): Observable<ITipo[]> {
       return this.http.delete<ITipo[]>(`${this.url}/eliminar/${id}`);
     }
   
}


