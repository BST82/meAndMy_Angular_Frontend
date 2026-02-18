import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of, finalize, Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Role } from '../../interfaces/roleInterface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user/`;
  private loginUrl = `${environment.apiUrl}/auth/login`;
  private refreshUrl = `${environment.apiUrl}/refresh`;
  private platformId = inject(PLATFORM_ID);
  private user$ = new BehaviorSubject<{ role: Role } | null>(null);

  // --- State Signals ---
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  lastUserCreated = signal<any>(null);
  currentUser = signal<any>(null);



/**
   * Login: Stores both Access and Refresh tokens
   */
login(credentials: any): Observable<any> {
  this.isLoading.set(true);
  this.error.set(null);

  return this.http.post(this.loginUrl, credentials).pipe(
    tap((res: any) => {
      // res = { access_token: "...", refresh_token: "...", user: {...} }
      this.saveTokens(res.access_token, res.refresh_token);
      this.currentUser.set(res.user || null);
    }),
    catchError((err) => {
      this.error.set(err.error?.detail || 'Invalid email or password');
      return of(null);
    }),
    finalize(() => this.isLoading.set(false))
  );
}

/**
 * Refresh Token: Call this when access token expires
 */
refreshToken(): Observable<any> {
  const refreshToken = localStorage.getItem('refresh_token');
  
  // We send refresh_token as a query param or body based on your FastAPI route
  return this.http.post(this.refreshUrl, { refresh_token: refreshToken }).pipe(
    tap((res: any) => {
      this.saveTokens(res.access_token, res.refresh_token);
    }),
    catchError((err) => {
      this.logout(); // If refresh fails, user must log in again
      return of(null);
    })
  );
}

/**
 * Helper to store tokens in LocalStorage
 */
private saveTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

/**
 * Registration
 */
registerUser(userData: any) {
  this.isLoading.set(true);
  this.error.set(null);

  return this.http.post(this.apiUrl, userData).pipe(
    catchError((err) => {
      this.error.set(err.error?.detail || 'Registration failed');
      return of(null);
    }),
    finalize(() => this.isLoading.set(false))
  );
}

/**
 * Logout
 */
logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  this.currentUser.set(null);
}

/**
 * Utility to get the token for Interceptors
 */
getAccessToken() {
  return localStorage.getItem('access_token');
}

isLoggedIn(): boolean {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('access_token');
    // Check if token exists and is NOT the literal string "null" or "undefined"
    return !!token && token !== 'null' && token !== 'undefined';
  }
  return false;
}


/*** role based access */
setUser(user: { role: Role }) {
  this.user$.next(user);
}

getUser() {
  return this.user$.asObservable();
}

hasRole(roles: Role[]): boolean {
  const user = this.user$.value;
  return !!user && roles.includes(user.role);
}

}
