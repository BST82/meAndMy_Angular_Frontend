import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authservices/auth-service';

// PrimeNG imports
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'; // Changed to PasswordModule for better compatibility
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Checkbox } from 'primeng/checkbox';
import { CommonModule } from '@angular/common'; // Required for validation messages

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterLink, 
    InputText, 
    PasswordModule, 
    Button, 
    Message,
    Checkbox
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          // 1. Check if tokens exist in the response
          if (res && res.access_token) {
            // 2. Save tokens to LocalStorage so isLoggedIn() returns true
            localStorage.setItem('access_token', res.access_token);
            if (res.refresh_token) {
                localStorage.setItem('refresh_token', res.refresh_token);
            }

            console.log('Login Success');
            
            // 3. Redirect to your protected home/dashboard page
            this.router.navigate(['/home']); 
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          // You could add a property here like 'errorMessage' to show on the UI
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}