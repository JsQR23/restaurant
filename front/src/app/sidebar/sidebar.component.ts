import { Component, Input } from '@angular/core';
import { UpdateService } from '../service/update.service';
import { IdService } from '../service/pasar-id.service';
import { UserService } from '../service/service.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private idService:IdService, 
    private updateService:UpdateService, 
    private userService:UserService,
    private router: Router) { }

  permiso:boolean=true
  isLinkDisabled:boolean=true
  id:number=0
  ngOnInit() {
    this.idService.getData().subscribe((data) => {
      //permiso corresponde al accordiontab
      this.permiso = data;
      //islinkdisabled corresponde al anchor, si se puede dar click en él o no
      this.isLinkDisabled=data;
      console.log("situacion permiso: ",data)
    });
    this.updateService.getId().subscribe((data) => {
      this.id = data;
    });
  }

  click() {
    this.sidebarVisible=false
  }
  clickActualizar(){
    this.sidebarVisible=false
    this.irActualizar(this.id)
    console.log("id al pasarse a actualizar",this.id)
  }
  clickBorrar(){
    this.sidebarVisible=false
    this.showModal=true
  }

  deleteUser() {
    console.log("this.id en deleteUser: ",this.id)
    this.userService.deleteUser(this.id).subscribe({

       next: (response) => {
         alert(response);
         this.showModal=false
       },
       error: (err) => {
         console.error(err);
        
       }
    });
   }
  showModal:boolean = false
  sidebarVisible:boolean=false;

  irActualizar(id: number) {
    this.router.navigate(['/update', id]);
  }
}
