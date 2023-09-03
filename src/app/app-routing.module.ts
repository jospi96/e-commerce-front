import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuard } from './services/auth/authGuard';
import { AuthAdminGuard } from './services/auth/authAdminGuard';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,children:[
  {path:"home", component:HomeComponent},
  {path:"product",component:ProductListComponent},
  {path:"details/:id", component:ProductDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"",component:HomeComponent,canActivate: [AuthGuard], children:[
    //utenti loggati
    
  ]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  
  {path:"" , redirectTo:"", pathMatch:"full"},
  { path: '**', redirectTo: 'home'}


]},
  {path:"admin",component:HomeComponent,canActivate:[AuthAdminGuard], children:[
    //admin
   
  ]},



];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
