import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './tasks/dashboard/dashboard.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
  // optional delete route (can be handled as an action inside TasksDashboard)
  { path: 'tasks/:id/delete', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/tasks' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
