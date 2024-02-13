
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { Session } from '../models/models';
import { Dish } from '../models/models';
//import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  logUser(user:User){
    
    return this.http.post(`http://localhost:3005/empleados/api/login`, user);
  }
  createUser(user:User){
    
    return this.http.post(`http://localhost:3005/empleados/api/create`, user);
  }
  deleteUser(id:number){
    return this.http.delete(`http://localhost:3005/empleados/api/delete/${id}`);
  }
  getUsers(){
    return this.http.get(`http://localhost:3005/empleados/api/read`);
  }
  getId(user:User){
    return this.http.post(`http://localhost:3005/empleados/api/getid`, user);
  }
  updateUser(datos:Session){
    return this.http.put(`http://localhost:3005/empleados/api/update`, datos);
  }
  
  createDish(platillo:Dish){
    return this.http.post(`http://localhost:3005/empleados/api/platillos`, platillo);
  }
  getDish(){
    return this.http.get(`http://localhost:3005/empleados/api/platillos/get`);
  }
}
