import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { empresa } from '../modelos/empresa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private coleccoionEmpresas: AngularFirestoreCollection<empresa>
  constructor(private afs: AngularFirestore) { }
  listarEmpresas(): Observable<empresa[]> {
    
    return this.afs.collection("empresas").snapshotChanges().pipe(map(actions => actions.map(documentEmpresa => {
      const empresa = documentEmpresa.payload.doc.data() as empresa;
      empresa.id = documentEmpresa.payload.doc.id;
      //this.afs.doc(empresa.pasajero.path).snapshotChanges().subscribe(s => console.log(s.payload.data()))
      //empresa.pasajero.get().then(s => console.log(s.data()))
      return empresa
    })));
  }
}
