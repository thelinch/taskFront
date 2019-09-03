import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { CicleAcademicsComponent } from './cicle-academics/cicle-academics.component';
import { TaskComponent } from './task/task.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { CicleAcademicsService } from './services/cicle-academics.service';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StateTaskService } from './services/state-task.service';

@NgModule({
  declarations: [CicleAcademicsComponent, TaskComponent, PrincipalComponent, CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AlumnoRoutingModule,
    MaterialModule
  ],
  providers: [CicleAcademicsService,StateTaskService]
})
export class AlumnoModule { }
