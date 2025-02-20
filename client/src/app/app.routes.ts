import { Routes } from '@angular/router';
import { VehiclesListComponent } from './component/vehicles-list';
import { VehicleFormComponent } from './component/vehicle-form';



export const routes: Routes = [
    { path: 'vehicles',  component: VehiclesListComponent },
    { path: 'vehicles/new', component: VehicleFormComponent },
    { path: 'vehicles/:id/edit', component: VehicleFormComponent },
    { path: '', redirectTo: 'vehicles', pathMatch: 'full' }
];