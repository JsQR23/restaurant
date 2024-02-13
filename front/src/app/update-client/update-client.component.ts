import { Component,OnInit } from '@angular/core';
import { User } from '../models/models';
import { UserService } from '../service/service.service';
import { IdService } from '../service/pasar-id.service';
import { Session } from '../models/models';
import { UpdateService } from '../service/update.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent {
  session:Session={
    id:0,
    email:'',
    password:''
  }

  constructor(private userService: UserService, 
    private route: ActivatedRoute) { 
    this.id=0
    
  }
  id!: number
//obtenemos el id a través del url:
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = +idParam;
    } else {
      console.error('el resultado del url fue nulo.');
    }

    this.session.id=this.id
  }

    /**
     * @description Usa el servicio de udateUser para actualizar las credenciales del usuario
     * @param {number} idUsuario - recibe el id del usuario para poder hacer la actualización correctamente
     * @returns {Object}
     **/
  updateUser(){

    this.userService.updateUser(this.session).subscribe({
       next: (response) => {
        console.log(response)
       },
       error: (err) => {
         console.error(err);
       }
    });
  }
}
