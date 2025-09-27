import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 👈 important
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) return;

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
      this.router.navigate(['/tasks']); // redirect to dashboard
      this.errorMessage = null;
    },
    error: (err) => {
      // Extract backend error message if available
      if (err?.error?.message) {
        this.errorMessage = err.error.message;
      } else if (err?.message) {
        this.errorMessage = err.message;
      } else {
        this.errorMessage = 'Login failed';
      }
    }
  });
}

}
