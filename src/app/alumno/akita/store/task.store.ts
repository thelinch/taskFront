import { Store, StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { task } from '../../models/task';
export interface taskState extends EntityState<task> {

}
@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: "task" })
export class taskStore extends EntityStore<taskState>{
    constructor() {
        super();
    }
}