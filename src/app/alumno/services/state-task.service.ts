import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { stateTask } from '../models/stateTask';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class StateTaskService {
  private urlControlador = "http://localhost:3000/stateTask/"

  constructor(
    private http: HttpClient) {
  }
  getListStateTask(): Observable<stateTask[]> {
    return this.http.get<stateTask[]>(this.urlControlador + "all");
  }

}
