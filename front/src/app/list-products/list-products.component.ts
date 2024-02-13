import { Component } from '@angular/core';
import { UserService } from '../service/service.service';
import { Dish } from '../models/models';
//import { Plat } from '../models/models';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
//aquí se obtienen todos los emails de los usuarios  
display:boolean=false;
  
constructor(private userService: UserService) { }

dish:any={
  nombre:'',
  precio:'',
  img:''
}

ngOnInit(): void {
  this.getProduct();
}

getProduct() {
  this.userService.getDish().subscribe({
     next: (response) => {
      this.dish = Object.entries(response);
     },
     error: (err) => {
       console.error(err);
    }
  });
}
}
