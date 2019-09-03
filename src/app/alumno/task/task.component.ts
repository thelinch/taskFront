import { StateTaskService } from './../services/state-task.service';
import { CicleAcademicQuery } from './../akita/query/cicleAcademic.query';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { task } from '../models/task';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import * as moment from 'moment';
import { TaskSandBox } from '../sadBoxs/task.sandBox';
import { TaskQuery } from '../akita/query/task.query';
import { SwalAlert } from 'src/app/global/swalAlert';
import { stateTask } from '../models/stateTask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  idCicleAcademic: number
  tasks$: Observable<task[]>
  taskSelected: task;
  formTask: FormGroup
  listStateTask: Observable<stateTask[]>
  nameFormTask = "formTask"
  currentDate;
  constructor(private _route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,
    private taskSandBox: TaskSandBox,
    private taskQuery: TaskQuery,
    private cicleAcademicQuery: CicleAcademicQuery,
    private stateTaskService:StateTaskService) {
    this.currentDate = moment();
  }

  ngOnInit() {
    this.idCicleAcademic = parseInt(this._route.snapshot.paramMap.get("idCicleAcademics"))
    this.formTask = this.fb.group({
      id: new FormControl(""),
      title: new FormControl("", Validators.required),
      content: new FormControl(""),
      endDate: new FormControl(moment(), [Validators.compose([Validators.required,])])
    })
    this.listStateTask=this.stateTaskService.getListStateTask();
    functionsGlobal.iniciarModal();
    this.taskSandBox.init(this.idCicleAcademic.toString())
    this.tasks$ = this.taskQuery.selectAll();
  }
  back() {
    this._location.back();
  }
  saveAndEditTask() {
    if (this.formTask.valid) {
      if (!this.formTask.get("id").value) {
        let json = {
          idCicleAcademic: this.idCicleAcademic,
          task: this.formTask.value
        }
        this.taskSandBox.createTask(json);
      } else if (this.taskSelected != null && !this.evaluationDateTask(this.taskSelected)) {
        this.taskSandBox.editTask(this.formTask.value, this.idCicleAcademic);
      } else {
        SwalAlert.getMessageError("Esta tarea se encuentra desactivada por que el tiempo se agoto")
      }
    } else {
      SwalAlert.getMessageError("Ingrese los campos requeridos del formulario");
    }
  }
  async deleteTask(id: number) {
    if (!this.evaluationDateTask(this.taskSelected)) {
      let option = await SwalAlert.getMessageQuestion("Desea eliminar la tarea...")
      if (option.value) {
        this.taskSandBox.deleteTask(id, this.idCicleAcademic);
      }
    } else {
      SwalAlert.getMessageError("Esta tarea se encuentra desactivada por que el tiempo se agoto")
    }
  }
  fillInDataFormTask(task: task) {
    this.formTask.get("id").setValue(task.id);
    this.formTask.get("title").setValue(task.title)
    this.formTask.get("content").setValue(task.content)
    this.formTask.get("endDate").setValue(task.endDate)

  }
  setTask(task: task) {
    this.taskSelected = task;
  }
  openModal(id: string) {
    functionsGlobal.openModal(id);
  }
  cleanForm(form: FormGroup) {
    form.reset();
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
