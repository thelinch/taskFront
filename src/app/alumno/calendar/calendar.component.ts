import { SwalAlert } from 'src/app/global/swalAlert';
import { functionsGlobal } from './../../global/funciontsGlobal';
import { Component, OnInit } from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import * as moment from 'moment';

import {
  CalendarEvent,
} from 'angular-calendar';

import { TaskQuery } from '../akita/query/task.query';
import { TaskSandBox } from '../sadBoxs/task.sandBox';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { task } from '../models/task';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  idCicleAcademic: number
  viewDate: Date = new Date();
  currentDate;
  taskSelected: task;
  events$: Observable<Array<CalendarEvent<{ task: task }>>>;
  nameFormTask = "formTask"
  view: string = 'month';
  activeDayIsOpen: boolean = false;
  formTask: FormGroup
  constructor(
    private _route: ActivatedRoute,
    private taskSandBox: TaskSandBox,
    private taskQuery: TaskQuery,
    private fb: FormBuilder,

  ) {
    this.currentDate = moment();
  }

  ngOnInit() {
    functionsGlobal.iniciarModal();
    this.idCicleAcademic = parseInt(this._route.snapshot.paramMap.get("idCicleAcademics"))
    this.taskSandBox.init(this.idCicleAcademic.toString())
    this.formTask = this.fb.group({
      id: new FormControl(""),
      title: new FormControl("", Validators.required),
      content: new FormControl(""),
      endDate: new FormControl("", [Validators.compose([Validators.required,])])
    })
    this.events$ = this.taskQuery.selectAll().pipe(map(tasks => {
      return tasks.map(task => {
        return {
          title: task.title,
          start: new Date(task.endDate),
          allDay: true,
          actions: [
            {
              label: '<i class="material-icons">create</i>',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                console.log('Edit event', event.meta);
                let task: task = event.meta.task as task;
                this.setTask(task);
                if (this.taskSelected != null && !this.evaluationDateTask(this.taskSelected)) {
                  this.formTask.get("id").setValue(task.id)
                  this.formTask.get("title").setValue(task.title)
                  this.formTask.get("content").setValue(task.content)
                  this.formTask.get("endDate").setValue(task.endDate)
                  this.openModal(this.nameFormTask)
                }
                else {
                  SwalAlert.getMessageError("Esta tarea se encuentra desactivada por que el tiempo se agoto")
                }
              }
            },
            {
              label: '<i class="material-icons">close</i>',
              onClick: async ({ event }: { event: CalendarEvent }): Promise<void> => {
                console.log('Edit event', event);
                let task: task = event.meta.task as task;
                this.setTask(task);
                if (this.taskSelected != null && !this.evaluationDateTask(this.taskSelected)) {
                  let option = await SwalAlert.getMessageQuestion("Esta seguro de eliminar la  tarea")
                  if (option.value) {
                    this.taskSandBox.deleteTask(task.id, this.idCicleAcademic);
                  }
                } else {
                  SwalAlert.getMessageError("Esta tarea se encuentra desactivada por que el tiempo se agoto")
                }
              }
            }
          ],
          meta: {
            task
          },
          color: {
            primary: task.stateTask.color,
            secondary: task.stateTask.color
          }

        }
      })
    }))
  }

  editTask() {
    if (this.formTask.valid) {
      this.taskSandBox.editTask(this.formTask.value as task, this.idCicleAcademic);
    } else {
      SwalAlert.getMessageError("Debe ingresar los campos requeridos")
    }

  }
  setTask(task: task) {
    this.taskSelected = task;
  }
  openModal(id: string) {
    functionsGlobal.openModal(id);
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id);
  }
  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ task: task }>>;
  }) {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  evaluationDateTask(task: task): boolean {
    let evaluation = false;
    let dateTask = moment(task.endDate);
    if (this.currentDate.isAfter(dateTask)) {
      evaluation = true;
    }
    return evaluation;
  }

}
