
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusListComponent } from './bus-list/bus-list.component';
import { AddBusComponent } from './add-bus/add-bus.component';
import { EditBusComponent } from './edit-bus/edit-bus.component';
import { BusDetailsComponent } from './bus-details/bus-details.component';
import { LoginComponent } from './login/login.component'; // Import the login component
const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route set to login
  { path: 'login', component: LoginComponent }, // Explicit login route
  { path: 'buses', component: BusListComponent },
  { path: 'buses/add', component: AddBusComponent },
  { path: 'buses/edit/:id', component: EditBusComponent },
  { path: 'buses/details/:id', component: BusDetailsComponent },
  { path: '**', redirectTo: '/login' } // Wildcard route to handle unknown paths
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}