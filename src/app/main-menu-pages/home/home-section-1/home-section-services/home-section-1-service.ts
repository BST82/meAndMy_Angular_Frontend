import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { MoonApiResponse } from '../../../../interfaces/moonPhase.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeSection1Service {
  // Use the base API URL from environment
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getMoonData(): Observable<MoonApiResponse> {
    return from(this.getCurrentLocation()).pipe(
      switchMap((coords) => {
        // Construct the URL precisely: http://127.0.0.1:8000/panchang/moon/phase
        const url = `${this.apiUrl}/panchang/moon/phase`;
        
        // Use HttpParams for a clean, encoded URL
        const params = new HttpParams()
          .set('lat', coords.lat.toString())
          .set('lng', coords.lng.toString());

        console.log('Firing API Call to:', `${url}?${params.toString()}`); 
        
        return this.http.get<MoonApiResponse>(url, { params });
      }),
      catchError((err) => {
        console.error('Service Level Error:', err);
        throw err;
      })
    );
  }

  private getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ lat: 26.84, lng: 80.94 }); // Fallback to Lucknow
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => {
          console.warn('Geolocation denied/failed, using Lucknow fallback');
          resolve({ lat: 26.84, lng: 80.94 }); 
        },
        { timeout: 5000, enableHighAccuracy: true } 
      );
    });
  }
}