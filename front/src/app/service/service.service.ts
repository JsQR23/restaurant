import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
//import { Observable } from 'rxjs';

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
  deleteUser(user:User){
    return this.http.post(`http://localhost:3005/empleados/api/delete`, user);
  }
  getUsers(){
    return this.http.get(`http://localhost:3005/empleados/api/read`);
  }
  getId(user:User){
    return this.http.post(`http://localhost:3005/empleados/api/getid`, user);
  }
  updateUser(user:any){
    return this.http.put(`http://localhost:3005/empleados/api/update`, user);
  }
}
