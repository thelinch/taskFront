import { cicleAcademic } from './cicleAcademics';
import { stateTask } from './stateTask';

export interface task {
    id: number
    title: string
    content: string
    endDate: Date
    cicleAcademic: cicleAcademic
    stateTask: stateTask
}