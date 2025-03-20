import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // ✅ Correcto
import { MachineService } from '../../services/machine.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

// ✅ Importar correctamente los módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';  // ✅ Agregar MatCardModule
import { MatDialogModule } from '@angular/material/dialog'; // ✅ Agregar MatDialogModule
import { MatPaginatorModule } from '@angular/material/paginator'; // ✅ Para paginación
import { MatSortModule } from '@angular/material/sort'; // ✅ Para ordenar columnas
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,  
    MatDialogModule, 
    MatPaginatorModule, 
    MatSortModule, 
    RouterModule
  ],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss',
})
export class TablaComponent implements OnInit{
  displayedColumns: string[] = ['name', 'model', 'serialNumber', 'location', 'status', 'actions'];
  machines: any[] = [];
  filteredMachines = new MatTableDataSource<any>([]);

  constructor(
    private machineService: MachineService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMachines();
  }

  loadMachines() {
    this.machineService.getMachines().subscribe((data) => {
      this.machines = data;
      this.filteredMachines.data = data;
    });
  }

  deleteMachine(id: string) {
    this.machineService.deleteMachine(id).subscribe(() => {
      this.loadMachines();
    });
  }

  openForm(machine?: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: machine || null 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMachines(); 
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredMachines.filter = filterValue;
  }
}
