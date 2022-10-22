import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  {path: '', component: ListEmpleadosComponent},
  {path: 'add', component: AgregarComponent},
  {path: 'edit/:id', component: AgregarComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
