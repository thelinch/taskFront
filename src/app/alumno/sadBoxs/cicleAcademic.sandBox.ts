import { cicleAcademic } from './../models/cicleAcademics';
import { cicleAcademicStore } from '../akita/store/cicleAcademics.store';
import { CicleAcademicsService } from '../services/cicle-academics.service';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

@Injectable({
    providedIn: 'root'
})
export class CicleAcademicSandBox {
    constructor(private cicleAcademicStore: cicleAcademicStore,
        private cicleAcademicService: CicleAcademicsService) {

    }
    init() {
        this.cicleAcademicService.getCliclesAcademics().subscribe(cicleAcademics => {
            console.log(cicleAcademics)
            this.cicleAcademicStore.set(cicleAcademics);
        })
    }
    selectActiveCicleAcademic(id: ID) {
        this.cicleAcademicStore.setActive(id);
    }
    createCicleAcademic(cicleAcademic: cicleAcademic) {
        this.cicleAcademicService.createCicleAcademic(cicleAcademic).subscribe(cicleAcademicSaved => {
            this.cicleAcademicStore.add(cicleAcademicSaved)
        })
    }
    deleteCicleAcademic(id: number) {
        this.cicleAcademicService.deleteCicleAcademic(id).subscribe(cicleAcademicDelete => {
            this.cicleAcademicStore.remove(id);
        })
    }
    editCicleAcademic(cicleAcademic: cicleAcademic) {
        this.cicleAcademicService.editCicleAcademic(cicleAcademic).subscribe(cicleAcademicEdit => {
            this.cicleAcademicStore.update(cicleAcademic.id, cicleAcademicEdit);
        })
    }
}