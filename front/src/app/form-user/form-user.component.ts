import { Component } from '@angular/core';
import { User } from '../models/models';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { UserService } from '../service/service.service';
import { IdService } from '../service/pasar-id.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from '../models/models';
import { UpdateService } from '../service/update.service';
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

  permiso:boolean
  constructor(private userService: UserService, private idService:IdService, private updateService:UpdateService) { 
    //permiso es para mostrar o no los accordion tab
    this.permiso=true
  }

  loginUser(user: User) {
    this.userService.logUser(user).subscribe({
       next: (response) => {
         console.log(response);
         alert("Ha accedido con éxito")
         this.permiso=false
         this.sendParent(this.permiso)
         this.getId(this.user)
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }
   sendParent(permiso:boolean){
    this.idService.sendData(permiso)
   }
   clickCreate(){
    this.createUser(this.user),
    this.showModal=false
   }
   createUser(user: User) {
    this.userService.createUser(user).subscribe({
       next: (response) => {
        console.log(response)
         alert(response);
         this.loginUser(this.user)

       },
       error: (err) => {
         console.log(err);
       }
    });
   }

   showModal: boolean = false;

   show(){
    
    this.showModal=true
    console.log(this.showModal)
   }


   handleResponse:any[]=[]
    /**
     * @description Para poder pasar al menú de actualización, se tiene que obtener el id del usuario a actualizar
     * @param {User} user - recibe el id del usuario para poder hacer la actualización correctamente
     * @returns {number} - a través de igualar myid al valor que se obtenga en la respuesta.
     */
   getId(user: User){
    this.userService.getId(user).subscribe({
       next: (response) => {
        this.handleResponse = Object.entries(response);
        const [key, value] = this.handleResponse.find(([key]) => key === 'id') || [];
        const myid: number = value;
//        this.session.id=myid
        console.log("myid: ",myid)
        this.updateService.sendData(myid)
       },
       error: (err) => {
         console.error(err);
       }
    });
   }
}