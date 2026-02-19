import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Muhurat, MuhuratResponse } from '../../../../interfaces/monthwiseMuhurt.interfact';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeSection3Service {

  private http = inject(HttpClient);

  // ✅ Correct API URL
  private apiUrl = `${environment.apiUrl}/muhurat/muhurats/current-month-muhurats`;

  getCurrentMonthMuhurat(): Observable<MuhuratResponse> {
    return this.http.get<MuhuratResponse>(this.apiUrl);
  }
}
