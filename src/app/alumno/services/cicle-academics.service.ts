import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cicleAcademic } from '../models/cicleAcademics';

@Injectable({
  providedIn: 'root'
})
export class CicleAcademicsService {
  private urlControlador = "http://localhost:3000/users/1/cicleAcademics/"
  constructor(private http: HttpClient) { }
  getCliclesAcademics(): Observable<cicleAcademic[]> {
    return this.http.get<cicleAcademic[]>(this.urlControlador);
  }
  deleteCicleAcademic(id: number): Observable<cicleAcademic> {
    return this.http.delete<cicleAcademic>(this.urlControlador + id + "/delete");
  }
  createCicleAcademic(cicleAcademic: cicleAcademic): Observable<cicleAcademic> {
    return this.http.post<cicleAcademic>(this.urlControlador + "create", cicleAcademic);
  }
  editCicleAcademic(cicleAcademicEdit: cicleAcademic): Observable<cicleAcademic> {
    return this.http.post<cicleAcademic>(this.urlControlador + "edit", cicleAcademicEdit);
  }
}
