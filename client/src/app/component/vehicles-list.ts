import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService, Vehicle } from '../vehicle.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzSelectModule,
    NzButtonModule,
    RouterModule
  ],
  template: `
    <div style="margin: 16px;">
      <!-- Status filter using ngModel -->
      <nz-select
        [(ngModel)]="selectedStatus"
        (ngModelChange)="onFilterChange()"
        style="width: 200px;"
        nzPlaceHolder="Filter by status"
      >
        <nz-option nzValue="" nzLabel="All"></nz-option>
        <nz-option nzValue="active" nzLabel="Active"></nz-option>
        <nz-option nzValue="inactive" nzLabel="Inactive"></nz-option>
      </nz-select>

      <!-- Data table -->
      <nz-table #vehicleTable [nzData]="vehicles"  style="margin-top: 16px;">
        <thead>
          <tr>
            <th>ID</th>
            <th>License Plate</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let vehicle of vehicleTable.data">
            <td>{{ vehicle.id }}</td>
            <td>{{ vehicle.licensePlate }}</td>
            <td>{{ vehicle.manufacturer }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.status }}</td>
            <td>
              <!-- Edit via route /vehicles/:id/edit -->
              <button
                nz-button
                nzType="primary"
                [routerLink]="['/vehicles', vehicle.id, 'edit']"
              >
                Edit
              </button>

              <!-- Delete (if id?: number, then vehicle.id! indicates that we are sure the id is not undefined) -->
              <button
                nz-button
                nzType="default"
                nzDanger
                (click)="onDelete(vehicle.id!)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </div>
  `
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  selectedStatus: string = '';

  constructor(
    private vehicleService: VehicleService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles(this.selectedStatus).subscribe({
      next: data => (this.vehicles = data),
      error: err => {
        this.message.error('Error loading vehicles');
        console.error(err);
      }
    });
  }

  onFilterChange(): void {
    this.loadVehicles();
  }

  onDelete(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe({
      next: () => {
        this.message.success('Vehicle deleted');
        this.loadVehicles();
      },
      error: err => {
        this.message.error('Error deleting vehicle');
        console.error(err);
      }
    });
  }
}
