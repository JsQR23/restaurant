import { Component,Input } from '@angular/core';
//import { Person } from '../models/models';
import { UserService } from '../service/service.service';
//import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})

export class ListClientComponent {
//aquí se obtienen todos los emails de los usuarios  
  display:boolean=false;
  
  constructor(private userService: UserService) { }

  emails:any[]=[]


  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.userService.getUsers().subscribe({
      //cuando se obtenga una respuesta del httpclient
      //haz esto:
       next: (response) => {
        //convierte a response en un objeto de srings, cada string es una llave 
        let keys = Object.keys(response);
        //extrae la última llave de keys y "afirma" que la última llave 
        //es una de las llaves del reponse:
        let lastKey = keys[keys.length - 1] as keyof typeof response;
        delete response[lastKey];
        this.emails = Object.entries(response);
        console.log("this.emails: ",this.emails)
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }
}
