import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authservices/auth-service';
import { inject } from '@angular/core';

// guards/guest.guard.ts
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // If logged in, DON'T let them see Register/Login. Send to Home.
    router.navigate(['/home']);
    return false;
  }
  // If NOT logged in, let them stay on the Register/Login page.
  return true;
};