import { Component } from '@angular/core';
import { User } from '../models/models';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from '../service/service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  user:User={
    email:'',
    password:''
  }
  /*la variable permiso es para un función que aún no acabo,
  lo mismo aplica para el @output y addnewitem*/
  id:number
  permiso:boolean
  constructor(private userService: UserService) { 
    this.id=0
    this.permiso=false
  }

  @Output() newItemEvent = new EventEmitter<boolean>();
  
  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  loginUser(user: User) {
    this.userService.logUser(user).subscribe({
      //cuando se obtenga una respuesta del httpclient
      //haz esto:
       next: (response) => {
         alert(response);
         this.permiso=true
         this.addNewItem(this.permiso)
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }
   createUser(user: User) {
    
    this.userService.createUser(user).subscribe({
      //cuando se obtenga una respuesta del httpclient
      //haz esto:
       next: (response) => {
         alert(response);
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }
   deleteUser(email:string, password:string) {
    this.userService.deleteUser(email,password).subscribe({
      
      //cuando se obtenga una respuesta del httpclient
      //haz esto:
       next: (response) => {
         alert(response);
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }

   showModal: boolean = false;
   username: string = '';
   password: string = '';
   handleResponse:any[]=[]

   getId(user: User){
    this.userService.getId(user).subscribe({
      //cuando se obtenga una respuesta del httpclient
      //haz esto:
       next: (response) => {
        this.handleResponse = Object.entries(response);
        const [key, value] = this.handleResponse.find(([key]) => key === 'id') || [];
        const myid: number = value;
        this.id=myid
        console.log("myid: ",myid)
        this.showModal=true
       },
       error: (err) => {
         console.error(err);
       }
    });
   }
    /**
     * @description Usa el servicio de udateUser para actualizar las credenciales del usuario
     * @param {number} idUsuario - recibe el id del usuario para poder hacer la actualización correctamente
     * @returns {Promise<Object>}
     */
  updateUser(idUsuario:number){
    console.log("idusuario: ",idUsuario)
    this.userService.updateUser(idUsuario).subscribe({
      //cuando se obtenga una respuesta del httpclient
      //haz esto:
       next: (response) => {
        console.log(response)
       },
       error: (err) => {
         console.error(err);
       }
    });
  }
}