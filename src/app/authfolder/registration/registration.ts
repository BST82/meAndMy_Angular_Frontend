import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select'; 
import { Card } from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password'; // Add this import
import { CommonModule } from '@angular/common'; // Add for *ngIf
import { AuthService } from '../../services/authservices/auth-service'; 
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    InputText, 
    Button, 
    Select, 
    Card, 
    IconField, 
    InputIcon, 
    RouterLink, 
    PasswordModule
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  regForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: [null, Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator }); // Attach cross-field validator

  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Astrologer', value: 'Astrologer' },
    { label: 'Pandit', value: 'Pandit' }
  ];

  // Custom Validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.regForm.valid) {
      // Remove confirmPassword before sending to Backend
      const { confirmPassword, ...dataToSend } = this.regForm.value;
      
      this.authService.registerUser(dataToSend).subscribe({
        next: (res) => {
          console.log('Registration Successful!', res);
          this.regForm.reset();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.regForm.markAllAsTouched();
    }
  }
}