import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CicleAcademicsComponent } from './cicle-academics/cicle-academics.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  {
    path: "", component: PrincipalComponent, children: [
      { path: "cicleAcademics", component: CicleAcademicsComponent },
      { path: "cicleAcademic/:idCicleAcademics/tasks", component: TaskComponent },
      { path: "cicleAcademic/:idCicleAcademics/tasks/calendar", component: CalendarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
