import { Component, Input } from '@angular/core';
import { UserService } from '../service/service.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  click() {
    this.sidebarVisible=false
  }
  currentItem:object={}
  sidebarVisible:boolean=false;
  constructor(private userService: UserService) { }

}
