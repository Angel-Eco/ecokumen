import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { NotificationComponent } from './notification/notification.component';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { timeout } from 'rxjs-compat/operator/timeout';
import {FlashMessagesService} from 'angular2-flash-messages';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

declare const FormFacade: any;

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;

    itemValueName ='';
    itemValueEmail ='';
    items: Observable<any[]>; 

    myForm: FormGroup;

    emailSuccess = false;
    emailError = false;
    /*
    emailFormControl = new FormControl("", [
        Validators.required,
        Validators.email
      ]);
    
    myForm = new FormControl("", [
        Validators.required,
        Validators.minLength(4)
    ]);
    */

  
    constructor( private renderer : Renderer2, public db?: AngularFireDatabase, public http?: HttpService, public fb?: FormBuilder, public flashMensaje?: FlashMessagesService) {
        this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        mensaje: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]]
      });
    }
    
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {        
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }
    toContact(){
        document.getElementById("contact").scrollIntoView(); 
    }
    getValues(val){
        console.warn(val);
        console.log('email ok');
        //this.afEmail        
    }
    sendEmail():void{
        console.log('email ok');
    }
    callfun(data){
        FormFacade(data);
    }
    onSubmit(){      
        this.emailError = false;
        this.emailSuccess = false;
        console.log(this.myForm.value.name);
        console.log(this.myForm.value.correo);
        
/*
        this.db.list('caja').push({content: this.itemValueName});
        this.db.list('items').push({content: this.itemValueName,content2: this.itemValueEmail});

        console.log(this.itemValueName);       
        console.log(this.itemValueEmail);
        this.http.test = "changed";
        console.log(this.http.test);  
*/
        let user = {
            name: this.myForm.value.name,
            email: this.myForm.value.correo,
            mensaje: this.myForm.value.mensaje
        }
        this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
            data => {
            let res:any = data;
            this.flashMensaje.show('Mensaje enviado', {cssClass: 'alert alert-success text-center', timeout: 4000});
            },
            err => {
            console.log(err);
            this.flashMensaje.show('Error en Mensaje', {cssClass: 'alert alert-danger text-center', timeout: 4000});
            //this.loading = false;
            //this.buttionText = "Submit";
            this.emailError = true;
            },() => {
            //this.loading = false;
            //this.buttionText = "Submit";
            }
        );
        
        console.log('flash');
        this.itemValueName = '';
        this.itemValueEmail = '';      
        
    }
 
    public envio(e: Event) {
        e.preventDefault();
        emailjs.sendForm('service_l24vktn', 'template_contacto', e.target as HTMLFormElement, 'user_3QlhDkioccqxBzrKDU3t9')
          .then((result: EmailJSResponseStatus) => {
            console.log(result.text);
            this.flashMensaje.show('Mensaje enviado', {cssClass: 'alert alert-success text-center', timeout: 4000});
          }, (error) => {
            this.flashMensaje.show('Error en Mensaje', {cssClass: 'alert alert-danger text-center', timeout: 4000});  
            console.log(error.text);
          });
          console.log("Form Submitted!");
          this.myForm.reset();        
    }
   


  

}
