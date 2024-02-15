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

  platoNumber:number=0

  createDish(plato:Dish){
    this.platoNumber=+plato.precio

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
