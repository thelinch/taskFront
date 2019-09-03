import { CicleAcademicSandBox } from './../sadBoxs/cicleAcademic.sandBox';
import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { CicleAcademicsService } from '../services/cicle-academics.service';
import { Observable } from 'rxjs';
import { cicleAcademic } from '../models/cicleAcademics';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CicleAcademicQuery } from '../akita/query/cicleAcademic.query';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SwalAlert } from 'src/app/global/swalAlert';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-cicle-academics',
  templateUrl: './cicle-academics.component.html',
  styleUrls: ['./cicle-academics.component.scss'],
  animations: [
    trigger("enterState", [
      state('void', style({
        transform: "translateX(-100%)",
        opacity: 0
      })),
      transition(":enter", [
        animate(300, style({
          transform: "translateX(0)",
          opacity: 1
        }))
      ])
    ])
  ]
})
export class CicleAcademicsComponent implements OnInit {
  ciclesAcademics$: Observable<cicleAcademic[]>
  formAddCicleAcademic: FormGroup;
  idModalCreateCicleAcademic: string = "modalCicleAcademic"
  loadingCicleAcademics$: Observable<boolean>
  constructor(private cicleAcademicService: CicleAcademicsService,
    private fb: FormBuilder, private cicleAcademicQuery: CicleAcademicQuery,
    private cicleAcademicSandBox: CicleAcademicSandBox) { }

  ngOnInit() {
    this.formAddCicleAcademic = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required])
    })
    functionsGlobal.iniciarModal();
    this.cicleAcademicSandBox.init();
    this.loadingCicleAcademics$ = this.cicleAcademicQuery.selectLoading();
    this.ciclesAcademics$ = this.cicleAcademicQuery.selectAll();
  }

  async deleteCicleAcademic(id: number) {
    const respuesta = await SwalAlert.getMessageQuestion("Desea eliminar el ciclo academico...")
    if (respuesta.value) {
      this.cicleAcademicSandBox.deleteCicleAcademic(id);
    }
  }
  fillInDataFormCicleAcademic(cicleAcademic: cicleAcademic) {
    this.formAddCicleAcademic.get("id").setValue(cicleAcademic.id);
    this.formAddCicleAcademic.get("name").setValue(cicleAcademic.name);
  }

  createAndEditCicleAcademic() {
    if (this.formAddCicleAcademic.valid) {
      if (this.formAddCicleAcademic.value.id != null) {
        this.cicleAcademicSandBox.editCicleAcademic(this.formAddCicleAcademic.value as cicleAcademic);
      } else {
        this.cicleAcademicSandBox.createCicleAcademic(this.formAddCicleAcademic.value as cicleAcademic);
      }

    } else {
      SwalAlert.getMessageError("Debe ingresar los campos requeridos");
    }

  }
  cleanForm(form: FormGroup) {
    form.reset();
  }
  setActivateCicleAcademic(id: ID) {
    this.cicleAcademicSandBox.selectActiveCicleAcademic(id);
  }
  openModal(id: string) {
    functionsGlobal.openModal(id);
  }
  closeModal(id: string) {
    functionsGlobal.closeModal(id);
  }
}
