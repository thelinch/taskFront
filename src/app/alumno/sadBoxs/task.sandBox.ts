import { TaskService } from './../services/task.service';
import { Injectable } from '@angular/core';
import { taskStore } from '../akita/store/task.store';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskSandBox {
    constructor(private taskStore: taskStore,
        private taskService: TaskService) {

    }
    init(idCicleAcademic: string) {
        this.taskService.getTasks(idCicleAcademic).subscribe(tasks => {
            this.taskStore.set(tasks);
        })
    }
    createTask(json: any) {
        this.taskService.createTask(json).subscribe(taskCreate => {
            this.taskStore.add(taskCreate)
        })
    }
    deleteTask(id: number,idCicleAcademic:number) {
        this.taskService.deleteTask(id,idCicleAcademic).subscribe(taskDelete => {
            this.taskStore.remove(taskDelete.id)
        })
    }
    editTask(json: any,idCicleAcademic:number) {
        this.taskService.editTask(json,idCicleAcademic).subscribe(taskUpdated=>{
            this.taskStore.update(taskUpdated.id,taskUpdated);
        })
     }

}