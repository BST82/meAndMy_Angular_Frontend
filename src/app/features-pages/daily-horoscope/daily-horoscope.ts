// daily-horoscope.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Import this
import { DailyHoroscopeService } from '../dailyHoroscopeService/daily-horoscope-service';

@Component({
  selector: 'app-daily-horoscope',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './daily-horoscope.html',
  styleUrl: './daily-horoscope.scss',
})
export class DailyHoroscope implements OnInit {
  private horoscopeService = inject(DailyHoroscopeService);
  private route = inject(ActivatedRoute);
private router = inject(Router);

  selectedSign = signal<string>('');
  selectedHoroscope = signal<any>(null);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const sign = params['sign'];
      if (sign) {
        this.selectedSign.set(sign);
        this.fetchData(sign);
      }
    });
  }

  fetchData(sign: string) {
    this.loading.set(true);
    this.horoscopeService.getDailyHoroscope(sign).subscribe({
      next: (res) => {
        this.selectedHoroscope.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching horoscope:', err);
        this.loading.set(false);
      }
    });
  }
  goBackToZodiac() {
    // 1. Navigate to the home route
    this.router.navigate(['/home']).then(() => {
      // 2. Wait a tiny bit for the home component to render, then scroll
      setTimeout(() => {
        const element = document.getElementById('zodiac-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }
}