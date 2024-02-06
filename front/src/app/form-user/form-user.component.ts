import { Component } from '@angular/core';
import { User } from '../models/models';
import { Observable } from 'rxjs';
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
  id:number
  constructor(private userService: UserService) { 
    this.id=0
  }

  loginUser(user: User) {
    
    this.userService.logUser(user).subscribe({
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
   deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
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