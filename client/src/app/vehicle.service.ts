import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehicle {
  id?: number;
  licensePlate: string;
  manufacturer: string;
  model: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(status: string = ''): Observable<Vehicle[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Vehicle[]>(this.apiUrl, { params });
  }


  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/${vehicle.id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
