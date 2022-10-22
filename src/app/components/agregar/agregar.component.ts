import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AgregarComponent implements OnInit {
  form: FormGroup;
  titulo: string = "Nuevo Empleado";
  id:any;

  constructor(private fg: FormBuilder, private empleadoService:EmpleadosService, 
                private router:Router, private _snackBar:MatSnackBar, private aRoute: ActivatedRoute) { 
    this.form = this.fg.group({
      nombre: ['',[Validators.required, Validators.maxLength(20)]],
      correo: ['',[Validators.required, Validators.email]],
      telefono: ['',Validators.required],
      fecha: ['',Validators.required],
      sexo: ['',Validators.required],
      estadoCivil: ['',Validators.required]
    });
    this.id = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id != undefined){
      this.titulo = "Modificar Empleado";
      this.editarEmpleado();
    }
    else this.titulo = "Nuevo Empleado"
  }

  agregar(){
    const Empleado: Empleado = {
      nombre: this.form.get('nombre')?.value,
      correo: this.form.get('correo')?.value,
      telefono: this.form.get('telefono')?.value,
      sexo: this.form.get('sexo')?.value,
      fecha: this.form.get('fecha')?.value,
      estadoCivil: this.form.get('estadoCivil')?.value
    }
     
    if (this.id == undefined){
      this.empleadoService.agregar(Empleado);
      this.router.navigate(["/"]);
      this.openSnackBar("Empleado registrado con éxito");
    }
    else {
      this.empleadoService.modificar(Empleado,this.id)
      this.id = undefined;
      this.router.navigate(["/"]);
      this.openSnackBar("Empleado modificado con éxito");
    }
  }

  editarEmpleado(){
    const empleado = this.empleadoService.getEmpleado(this.id);
    this.form.patchValue({nombre: empleado.nombre,
      correo: empleado.correo,
      telefono: empleado.telefono,
      sexo: empleado.sexo,
      fecha: empleado.fecha,
      estadoCivil: empleado.estadoCivil
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"Cerrar", {
      duration: 3000,
    });
  }
}
