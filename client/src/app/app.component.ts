
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <header style="background: #001529; padding: 16px;">
      <div style="color: #fff; font-size: 20px; display: inline-block; margin-right: 24px;">
        Vehicle Management
      </div>
      <a routerLink="/vehicles" style="color: #fff; margin-right: 16px;">List</a>
      <a routerLink="/vehicles/new" style="color: #fff;">Add</a>
    </header>

    <main style="padding: 16px;">
      <router-outlet></router-outlet>
    </main>

    <footer style="text-align: center; background: #f0f2f5; padding: 16px;">
      Vehicle Management ©2025
    </footer>
  `
})
export class AppComponent {}
