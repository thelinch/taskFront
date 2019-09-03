import { cicleAcademic } from '../../models/cicleAcademics';
import { Store, StoreConfig, ActiveState, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
export interface cicleAcademicState extends EntityState<cicleAcademic>, ActiveState {

}
@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: "cicleAcademic" })
export class cicleAcademicStore extends EntityStore<cicleAcademicState, cicleAcademic>{
    constructor() {
        super();
    }
}