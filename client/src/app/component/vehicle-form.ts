import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService, Vehicle } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule
  ],
  template: `
    <div style="margin: 16px;">
      <form nz-form [formGroup]="vehicleForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label [nzSpan]="6">License Plate</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <input nz-input formControlName="licensePlate" placeholder="Enter license plate" />
          </nz-form-control>
        </nz-form-item>
  
        <nz-form-item>
          <nz-form-label [nzSpan]="6">Manufacturer</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <input nz-input formControlName="manufacturer" placeholder="Enter manufacturer" />
          </nz-form-control>
        </nz-form-item>
  
        <nz-form-item>
          <nz-form-label [nzSpan]="6">Model</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <input nz-input formControlName="model" placeholder="Enter model" />
          </nz-form-control>
        </nz-form-item>
  
        <nz-form-item>
          <nz-form-label [nzSpan]="6">Status</nz-form-label>
          <nz-form-control [nzSpan]="14">
            <nz-select formControlName="status">
              <nz-option nzValue="active" nzLabel="Active"></nz-option>
              <nz-option nzValue="inactive" nzLabel="Inactive"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
  
        <nz-form-item>
          <nz-form-control [nzSpan]="14" [nzOffset]="6">
            <button nz-button nzType="primary" type="submit">
              {{ isEdit ? 'Update' : 'Add' }}
            </button>
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
  `
})
export class VehicleFormComponent implements OnInit {

  vehicleForm!: FormGroup;
  isEdit = false;
  vehicleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.vehicleForm = this.fb.group({
      licensePlate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      status: ['active', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEdit = true;
        this.vehicleId = +idParam;
        this.vehicleService.getVehicle(this.vehicleId).subscribe({
          next: (vehicle) => {
    
            this.vehicleForm.patchValue(vehicle);
          },
          error: err => {
            this.message.error('Error loading vehicle data');
            console.error(err);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      this.message.error('Please fill in the required fields');
      return;
    }

    const formData: Vehicle = this.vehicleForm.value;

    if (this.isEdit && this.vehicleId) {
      formData.id = this.vehicleId;
      this.vehicleService.updateVehicle(formData).subscribe({
        next: () => {
          this.message.success('Vehicle updated');
          this.router.navigate(['/vehicles']);
        },
        error: err => {
          if (err.status === 409) {
            this.message.error('License plate must be unique');
          } else {
            this.message.error('Error updating vehicle');
          }
          console.error(err);
        }
      });
    } else {
      this.vehicleService.addVehicle(formData).subscribe({
        next: () => {
          this.message.success('Vehicle added');
          this.router.navigate(['/vehicles']);
        },
        error: err => {
          if (err.status === 409) {
            this.message.error('License plate must be unique');
          } else {
            this.message.error('Error adding vehicle');
          }
          console.error(err);
        }
      });
    }
  }
}
