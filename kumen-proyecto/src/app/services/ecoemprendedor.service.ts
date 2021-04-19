import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

// Model
import {Ecoemprendedor} from '@app/model/ecoemprendedor';

@Injectable()
export class EcoemprendedorService {

  ecoemprendedorList: AngularFireList<any>;
  selectedEcoemprendedor: Ecoemprendedor = new Ecoemprendedor();

  constructor(private firebase: AngularFireDatabase) { }

  getEcoemprendedores()
  {
    return this.ecoemprendedorList = this.firebase.list('ecoemprendedores');
  }

  insertEcoemprendedor(ecoemprendedor: Ecoemprendedor, urlPath:string)
  {
    if(urlPath!=''){
      this.ecoemprendedorList.push({
        name: ecoemprendedor.name,
        //fileUploader: ecoemprendedor.fileUploader,
        imagen: urlPath
      });
    }
  }

  updateEcoemprendedor(ecoemprendedor: Ecoemprendedor)
  {
    /*
    this.ecoemprendedorList.update(ecoemprendedor.$key, {
      name: ecoemprendedor.name
    });
    */
  }

  deleteEcoemprendedor($key: string)
  {
    this.ecoemprendedorList.remove($key);
  }
}
