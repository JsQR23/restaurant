import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FormUserComponent } from './form-user/form-user.component';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import {TableModule} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { UserService } from './service/service.service';
import {DialogModule} from 'primeng/dialog';
import { UpdateClientComponent } from './update-client/update-client.component';


const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'form',component:FormUserComponent},
  {path:'lsclients',component:ListClientComponent},
  {path:'lsproducts',component:ListProductsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    ListClientComponent,
    ListProductsComponent,
    FormUserComponent,
    UpdateClientComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule, 
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    HttpClientModule,
    DialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
