import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  displayedColumns: string[] = ['Nombre completo', 'Correo', 'Telefono', 'Estado civil', 'Fecha', 'Sexo','Acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  listEmpleado: Empleado[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private empleadoService: EmpleadosService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado(){
    this.listEmpleado = this.empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource<Empleado>(this.listEmpleado);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(index:number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: '¿Esta seguro que desea eliminar el Empleado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.empleadoService.eliminar(index);
        this.cargarEmpleado();
        this.openSnackBar();
      }
    });
  }

  openSnackBar() {
    this._snackBar.open("Elemento eliminado con éxito","Cerrar", {
      duration: 3000,
    });
  }
}
