
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // твой файл с маршрутами

import { AppComponent } from './app/app.component';


import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';


bootstrapApplication(AppComponent, {
  providers: [
    
    provideRouter(routes),

    provideHttpClient(),


    provideAnimations(),


    importProvidersFrom(
      NzButtonModule,
      NzTableModule,
      NzFormModule,
      NzInputModule,
      NzSelectModule,
      NzMessageModule
    )
  ]
})
.catch(err => console.error(err));
