import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, finalize, of, tap } from 'rxjs';
import { HeaderResponse, MenuItem } from '../../interfaces/header.interface';

@Injectable({
  providedIn: 'root',
})
export class HeaderFooterService {
  private http = inject(HttpClient);
  private headerUrl = `${environment.apiUrl}/header/header`;

  // ---- State ----
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  menu = signal<MenuItem[]>([]);

  /**
   * Fetch Header Menu
   */
  getHeaderMenu() {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.get<HeaderResponse>(this.headerUrl).pipe(
      tap((res: HeaderResponse) => {
        this.menu.set(res.menu);
      }),
      catchError(() => {
        this.error.set('Failed to load header menu');
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
