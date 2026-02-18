import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ChoghadiyaResponse } from '../../../../interfaces/choghadiya.interface';

@Injectable({
  providedIn: 'root',
})
export class Homesection2Service {
  private http = inject(HttpClient);

  //  base url
  private apiUrl = `${environment.apiUrl}/chohadiya/choghadiya`;

  // default location (you can make dynamic later)

  getChoghadiyaData(
    date: Date,
    latitude: number,
    longitude: number
  ): Observable<ChoghadiyaResponse> {
    const formattedDate = date.toISOString().split('T')[0];

    return this.http.get<ChoghadiyaResponse>(this.apiUrl, {
      params: {
        date: formattedDate,
        latitude,
        longitude,
      },
    });
  }
}
