import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ClientSuggestsComponent } from './client-suggests/client-suggests.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListProductsComponent } from './list-products/list-products.component';
const routes: Routes = [
  {path: '', component: FormUserComponent},
  {path: 'update/:id',component:UpdateClientComponent},
  {path: 'lsclients', component: ListClientComponent},
  {path: 'lsproducts', component: ListProductsComponent},
  {path: 'formsuggest', component: ClientSuggestsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
