import { task } from './task';
import { ID } from '@datorama/akita';

export interface cicleAcademic {
    id: ID
    name: string
    updatedAt: Date
    completado: number
    nocompletado: number
    pendiente: number
    status: boolean
    tasks: task[]
}