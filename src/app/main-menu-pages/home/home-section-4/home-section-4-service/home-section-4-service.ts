import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FestivalResponse } from '../../../../interfaces/festival.model'; 

@Injectable({
  providedIn: 'root',
})
export class HomeSection4Service {
  private apiUrl = 'http://localhost:8000/festival/festival/';

  constructor(private http: HttpClient) {}

  getFestivals(): Observable<FestivalResponse> {
    return this.http.get<FestivalResponse>(this.apiUrl);
  }
}
