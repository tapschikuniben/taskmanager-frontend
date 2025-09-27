import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './tasks/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/new',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
