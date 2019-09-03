import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { taskState, taskStore } from '../store/task.store';
import { task } from '../../models/task';
@Injectable({
    providedIn: 'root'
})
export class TaskQuery extends QueryEntity<taskState, task> {
    constructor(protected store: taskStore) {
        super(store);
    }
}