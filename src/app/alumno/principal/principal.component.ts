import { Component, OnInit } from '@angular/core';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../animations';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    functionsGlobal.iniciarCollapside();
    functionsGlobal.iniciarModal();
    functionsGlobal.iniciarMaterialBoxed();
    functionsGlobal.iniciarTooltip();
    functionsGlobal.iniciarSideNav();
    functionsGlobal.iniciarScrollSpy();
    functionsGlobal.iniciarDropdown();
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
