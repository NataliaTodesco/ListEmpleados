import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  listEmpleado: Empleado[] = [{nombre:'Fabricio Martinez',correo:'fmartinez@gmail.com',telefono:3518167788,estadoCivil:'Soltero',fecha: new Date(),sexo:'Masculino',},
  {nombre:'Lilah Smitheram',correo:'lsmitheram0@google.com',telefono:3518167788,estadoCivil:'Soltero',fecha: new Date(),sexo:'Femenino',},
  {nombre:'Uta Targe',correo:'utarge6@booking.com',telefono:3513887862,estadoCivil:'Casado',fecha: new Date(),sexo:'Masculino',},
  {nombre:'Estele Ciciura',correo:'eciciura5@slideshare.net',telefono:3518164881,estadoCivil:'Soltero',fecha: new Date(),sexo:'Femenino',},
  {nombre:'Brana Wallhead',correo:'bwallhead2@vinaora.com',telefono:3518167785,estadoCivil:'Soltero',fecha: new Date(),sexo:'Femenino',},
  {nombre:'Monti Mongeot',correo:'mmongeot3@aboutads.info	',telefono:3518167138,estadoCivil:'Casado',fecha: new Date(),sexo:'Masculino',}
]
  constructor() { }

  getEmpleados(){
    return this.listEmpleado.slice();
  }

  getEmpleado(indice:number){
    return this.listEmpleado[indice];
  }

  eliminar(index:number){
    this.listEmpleado.splice(index,1);
  }

  agregar(empleado:any){
    this.listEmpleado.unshift(empleado);
  }

  modificar(empleado:any,id:number){
    this.listEmpleado[id] = empleado;
  }
}
