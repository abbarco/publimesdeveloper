import { Component, Inject, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  machineForm: FormGroup;
  id: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private machineService: MachineService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.machineForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.maxLength(50)]],
      serialNumber: ['', [Validators.required, Validators.maxLength(50)]],
      location: [''],
      status: ['active', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.id = this.data.id;
      this.machineForm.patchValue(this.data);
    }
  }

  submitForm() {
    if (this.machineForm.valid) {
      if (this.id) {
        this.machineService
          .updateMachine(this.id, this.machineForm.value)
          .subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: (error: HttpErrorResponse) => {
              this.handleError(error);
            },
          });
      } else {
        this.machineService.createMachine(this.machineForm.value).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error);
          },
        });
      }
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.errorMessage = 'El número de serie ya existe. Intenta con otro.';
      alert(this.errorMessage);
    } else if (error.status === 500) {
      this.errorMessage = 'Error en el servidor. Inténtalo más tarde.';
    } else {
      this.errorMessage = 'Error inesperado. Inténtalo de nuevo.';
      alert(this.errorMessage);
    }
  }
}
