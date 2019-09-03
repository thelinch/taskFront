import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicleAcademicsComponent } from './cicle-academics.component';

describe('CicleAcademicsComponent', () => {
  let component: CicleAcademicsComponent;
  let fixture: ComponentFixture<CicleAcademicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicleAcademicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicleAcademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
