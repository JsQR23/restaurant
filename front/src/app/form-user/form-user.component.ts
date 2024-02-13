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

  constructor(private userService: UserService, private idService:IdService, private updateService:UpdateService) { 
    //permiso es para mostrar o no los accordion tab
    this.permiso=true
  }
    /**
     * @description Para poder acceder o loggearse
     * @param {User} user - recibe el objeto de tipo usuario para poder hacer la actualización correctamente
     * @returns {user} 
     */
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
    /**
     * @description Una vez loggeado, se manda una bandera o peermiso para mostrar opciones de la sidebar
     * @param {Boolean} permiso
     * @returns {Boolean} permiso 
     */
   sendParent(permiso:boolean){
    this.idService.sendData(permiso)
   }
//hay botones que necesitan hacer más de una acción al ser pulsados
   clickCreate(){
    this.createUser(this.user),
    this.showModal=false
   }
   show(){
    this.showModal=true //muestra o esconde el menú de registro
   }

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
          console.log("myid: ",myid)
          this.updateService.sendData(myid)
         },
         error: (err) => {
           console.error(err);
         }
      });
     }
    /**
     * @description Crea un nuevo usuario
     * @param {User} user
     */
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



   //variables de apoyo
   handleResponse:any[]=[] //cuando se pide el id, se vienen varios datos con él, por eso necesita-
                          //mos controlar la respuesta
   showModal: boolean = false; //abre o cierra el menú para registrarse
   permiso:boolean //muestra varias opciones de la sidebar cuando ya se ha loggeado
}