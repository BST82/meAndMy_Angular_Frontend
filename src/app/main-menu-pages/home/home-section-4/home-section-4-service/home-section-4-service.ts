import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivalResponse } from '../../../../interfaces/festival.model'; 
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeSection4Service {
  private apiUrl = `${environment.apiUrl}/festival/festival/current-month-festivals`;

  constructor(private http: HttpClient) {}

  getFestivals(): Observable<FestivalResponse> {
    return this.http.get<FestivalResponse>(this.apiUrl);
  }
}
