import { Query, QueryEntity } from '@datorama/akita';
import { cicleAcademicStore, cicleAcademicState } from '../store/cicleAcademics.store';
import { cicleAcademic } from '../../models/cicleAcademics';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class CicleAcademicQuery extends QueryEntity<cicleAcademicState, cicleAcademic> {
    constructor(protected store: cicleAcademicStore) {
        super(store);
    }
}