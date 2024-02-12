import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ClientSuggestsComponent } from './client-suggests/client-suggests.component';
import { IdService } from './service/pasar-id.service';
import { UpdateService } from './service/update.service';


const appRoutes:Routes=[
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListClientComponent,
    ListProductsComponent,
    FormUserComponent,
    UpdateClientComponent,
    ClientSuggestsComponent
    
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
  providers: [UserService, IdService,UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
