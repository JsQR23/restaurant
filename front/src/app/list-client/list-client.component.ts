import { Component,Input } from '@angular/core';
import { Person } from '../models/models';
import { UserService } from '../service/service.service';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})

export class ListClientComponent {
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
        let keys = Object.keys(response);
        let lastKey = keys[keys.length - 1] as keyof typeof response;
        delete response[lastKey];
        this.emails = Object.entries(response);
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }
  people: Person[]=[
    {nombre:"October Bloodgood",img:"https://delmarvareview.org/wp-content/uploads/2021/10/TaraThiel.jpg",comentario:"1.-Lorem ipsum Dolores tenetur sapiente amet ea. Neque est odio nam exercitationem cumque voluptatem quos aut. At voluptatum consequatur esse illo nostrum ut dolorem a. Iste ut ipsam id velit."},
    {nombre:"Drannor Leojor",img:"https://www.hillsdale.edu/wp-content/uploads/2016/03/Holly-Hobbs-Headshot-768x1024.jpg",comentario:"2.-Lorem ipsum Dolores tenetur sapiente amet ea. Neque est odio nam exercitationem cumque voluptatem quos aut. At voluptatum consequatur esse illo nostrum ut dolorem a. Iste ut ipsam id velit."},
    {nombre:"Ruith Yindithas",img:"https://upload.wikimedia.org/wikipedia/commons/b/bd/Ruth_Bader_Ginsburg%2C_official_SCOTUS_portrait%2C_crop.jpg",comentario:"3.-Lorem ipsum Dolores tenetur sapiente amet ea. Neque est odio nam exercitationem cumque voluptatem quos aut. At voluptatum consequatur esse illo nostrum ut dolorem a. Iste ut ipsam id velit."},
    {nombre:"Shenarah Arajyre",img:"https://static.cinemagia.ro/img/db/movie/47/88/72/the-shannara-chronicles-601140l.jpg",comentario:"4.-Lorem ipsum Dolores tenetur sapiente amet ea. Neque est odio nam exercitationem cumque voluptatem quos aut. At voluptatum consequatur esse illo nostrum ut dolorem a. Iste ut ipsam id velit."},
    {nombre:"Inchel Lorana",img:"https://atwoodmagazine.com/wp-content/uploads/2020/06/Lorana-%C2%A9-2020-1050x700.jpg",comentario:"5.-Lorem ipsum Dolores tenetur sapiente amet ea. Neque est odio nam exercitationem cumque voluptatem quos aut. At voluptatum consequatur esse illo nostrum ut dolorem a. Iste ut ipsam id velit."},

  ]
  selectedPerson: Person = {} as Person;

  mostrar(person: Person) {
   this.display = true;
   this.selectedPerson = person;
  }
}
