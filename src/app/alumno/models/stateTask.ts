import { task } from './task';

export interface stateTask {
    id: number
    name: string
    color: string
    status: boolean
    tasks: task[]
}