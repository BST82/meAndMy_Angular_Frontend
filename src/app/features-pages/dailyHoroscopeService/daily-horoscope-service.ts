import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DailyHoroscopeService {
  // Use inject() for a modern Angular approach, or standard constructor injection
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Fetches the daily horoscope from the FastAPI proxy
   * @param sign The zodiac sign (e.g., 'Aries')
   * @param day The day (defaults to 'TODAY')
   */
  getDailyHoroscope(sign: string, day: string = 'TODAY'): Observable<any> {
    // We append the /external/horoscope path we defined in FastAPI
    const url = `${this.baseUrl}/external/horoscope`;
    
    // Using HttpParams to handle query parameters safely
    const params = new HttpParams()
      .set('sign', sign)
      .set('day', day);

    return this.http.get<any>(url, { params });
  }
}