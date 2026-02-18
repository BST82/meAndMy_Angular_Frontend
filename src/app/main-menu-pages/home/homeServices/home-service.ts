import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://api.astronomyapi.com/api/v2/astronomy/moon-phase';
  
  // These should come from your AstronomyAPI Dashboard
  private appId = '2001:4860:7:505::d7'; 
  private appSecret = '7K8fglAwEMUWV4kbBlue7FNv5rECqruJ9bhCuwhF';

  constructor(private http: HttpClient) {}

getMoonData(lat: number, lon: number, date: string): Observable<any> {
    // 1. Basic Auth Header
    const credentials = btoa(`${this.appId}:${this.appSecret}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    // 2. Query Parameters
    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lon.toString())
      .set('date', date);

    return this.http.get(this.apiUrl, { headers, params });
  }
}