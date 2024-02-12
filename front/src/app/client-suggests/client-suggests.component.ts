import { Component } from '@angular/core';
import { Dish } from '../models/models';
import { UserService } from '../service/service.service';
@Component({
  selector: 'app-client-suggests',
  templateUrl: './client-suggests.component.html',
  styleUrls: ['./client-suggests.component.scss']
})
export class ClientSuggestsComponent {
  dish:Dish={
    nombre:'',
    precio:'',
    img:''
  }
  constructor(private userService: UserService) {}

  platoNumber:Number=0
  createDish(plato:Dish){
    this.platoNumber=Number(plato.precio)
    console.log(`tipo de la variable precio: ${typeof(this.platoNumber)}`)
    this.userService.createDish(plato).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (err) => {
        console.error(err);
      }
   });
  }
}
