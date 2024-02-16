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

    /**
     * @description: Se necesitan de dos servicios: uno para saber si se pueden mostrar todos los elementos de la sidebar
     * y otro para obtener el id de quien se acaba de loggear
     * @author: Fabián Quintanar 12/02/24
     */
  ngOnInit() {
//el nombre no fue el más correcto, pero este servicio obitene el permiso para mostrar
//los elementos ocultos de la sidebar
    this.idService.getData().subscribe((data) => {
      //permiso corresponde al accordiontab
      this.permiso = data;
      //islinkdisabled corresponde al anchor, si se puede dar click en él o no
      console.log("situacion permiso: ",data)
    });
    this.updateService.getId().subscribe((data) => {
      this.id = data;
    });
  }


    /**
     * @description: Hay botones que tienen que realizar dos acciones a la vez
     * @param {number} idUser
     * @author: Fabián Quintanar 12/02/24
     */
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
    this.showModal= !this.showModal
  }
    /**
     * @description: Llama al servicio de borrar usuarios
     * @param {number} idUser
     * @author: Fabián Quintanar 12/02/24
     */
  deleteUser() {
    this.userService.deleteUser(this.id).subscribe({

       next: (response) => {
        alert(response);
        this.showModal=false
       },
       error: (err) => {
        this.showModal=false
        console.error(err);
        
       }
    });
   }
    /**
     * @description: Permite renderizar el componente update-client y pasar el id de quien se actualiza
     * @param {number} idUser
     * @author: Fabián Quintanar 12/02/24
     */
  irActualizar(id: number) {
    this.router.navigate(['/update', id]);
  }
/*variables de apoyo*/
  showModal:boolean = false //muestra el primeng modal que contiene las opciones para borrar la cuenta del usuario
  id:number=0 //el id se usa para saber qué usuario borrar
  sidebarVisible:boolean=false; //abra o cierra la barra vertical
  permiso:boolean=true //da permiso de mostrar ciertas tabs de la barra vertical

}
