import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { EcoemprendedorService } from '@app/services/ecoemprendedor.service';
import { NgForm } from '@angular/forms';
import { Ecoemprendedor } from '@app/model/ecoemprendedor';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';
import { ElementRef, ViewChild } from '@angular/core';
import { timeout } from 'rxjs-compat/operator/timeout';
import * as firebase from 'firebase';

//import { StorageService } from '@app/services/storage/storage.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { EMPTY,Subject } from 'rxjs';
import { Router } from '@angular/router';

//importaciones para sincronizar user admin
import { User } from '@shared/models/user.interface';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-ecoemprendedores',
    templateUrl: './ecoemprendedores.component.html',
    styleUrls: ['./ecoemprendedores.component.scss']
})

export class EcoemprendedoresComponent implements OnInit {

  public user$: Observable<User> = this.authSvc.afAuth.user;
  
  //estas variables son para q la barra search no aparezca cargada
  searching = false;
  focusOnList = false;
  //variables para imagenes
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  urlImage: Observable<string>;

  imagenUsuario='';

  //3 era
  task: AngularFireUploadTask;  

  //otros variables
  ecoemprendedorList: Ecoemprendedor[];

  stateForm: FormGroup;
  showDropDown = false;

  catalogo:any[]=[
    this.ecoemprendedorService.getEcoemprendedores()    
  ];



  displayURL;

  constructor(private fb: FormBuilder, 
    public db?: AngularFireDatabase,
    private ecoemprendedorService?: EcoemprendedorService, 
    private storage?: AngularFireStorage,
    public authSvc?: AuthService
    ) {
    this.initForm()
  }
  @ViewChild('imageUser',{static:true}) inputImageUser: ElementRef;

  //VALIDACION DE ROLES
  public isAdmin: any = null;
  public userUid: string = null;
  
  initForm(): FormGroup {    
    return this.stateForm = this.fb.group({
      search: [null]
    })
  }
  

  ngOnInit() {    
    this.resetFormTest();
    this.getCurrentUser();    
    return this.ecoemprendedorService.getEcoemprendedores()
      .snapshotChanges().subscribe(item => {
        this.ecoemprendedorList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.ecoemprendedorList.push(x as Ecoemprendedor);
        });
      });     
  } 

  //VALIDACION DE ROL ADMIN
  getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe(userRole => {
          //this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          //console.log(Object.assign({}, userRole));
          
          if(Object.assign({}, userRole).roles =='ADMIN'){
            this.isAdmin = true;
          }
          
          // this.isAdmin = true;
        })
      }
    })
  }

  selectValue(value) {
    this.stateForm.patchValue({"search": value});
    console.log(this.stateForm.value.search);
    this.showDropDown = false;
  }

  closeDropDown() {
    this.showDropDown = !this.showDropDown;       
  }

  openDropDown() {
    this.showDropDown = false;
  }

  getSearchValue() {
    console.log(this.stateForm.value.search);  
    return this.stateForm.value.search;
  }
  url:string;
  onSubmit(ecoemprendedorForm: NgForm)
  {
    this.isSubmitted = true;
    const id = Math.random().toString(36).substring(2);
    var filePath = `imagenecoemprendedor/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const ref = this.storage.ref(filePath);

    console.log(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.ecoemprendedorService.insertEcoemprendedor(ecoemprendedorForm.value,this.url);
         
          alert('Imagen Cargada!');
          this.resetForm(ecoemprendedorForm);          
        })
      })
    ).subscribe(); 

  }

 
  eliminar(ecoemprendedorForm?: NgForm)
  {
    if(ecoemprendedorForm != null)
      ecoemprendedorForm.reset();
      this.ecoemprendedorService.selectedEcoemprendedor = new Ecoemprendedor();
  }

  onDelete($key: string,imagenUrl: string) {
    if(confirm('Estas seguro de borrar esto?')) {
      //borramos del realtime database
      this.ecoemprendedorService.deleteEcoemprendedor($key);
      //borramos del storage
      this.storage.storage.refFromURL(imagenUrl).delete()  
    }
  }

  resetForm(ecoemprendedorForm?: NgForm)
  {
    if(ecoemprendedorForm != null)
      ecoemprendedorForm.reset();
      this.ecoemprendedorService.selectedEcoemprendedor = new Ecoemprendedor();
  }

  showPreview(event: any) {     
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {       
      this.imgSrc = './assets/img/reciclaje-natural.jpg';
      this.selectedImage = null;
    }
  }

  resetFormTest() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc = '/assets/img/reciclaje-natural.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
}
