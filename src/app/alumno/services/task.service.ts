import { task } from './../models/task';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private urlControlador = "http://localhost:3000/cicleAcademic/"
  constructor(
    private http: HttpClient) {
  }
  getTasks(idCicleAcademic: string): Observable<task[]> {
    return this.http.get<task[]>(this.urlControlador + idCicleAcademic + "/tasks")
  }
  createTask(json: any): Observable<task> {
    return this.http.post<task>(this.urlControlador + json.idCicleAcademic + "/tasks/create", json);
  }
  deleteTask(id: number, idCicleAcademic: number): Observable<task> {
    return this.http.delete<task>(this.urlControlador + idCicleAcademic + "/tasks/" + id + "/delete");
  }
  editTask(json: any, idCicleAcademic: number): Observable<task> {
    return this.http.post<task>(this.urlControlador + idCicleAcademic + "/tasks/update", json);
  }
}
