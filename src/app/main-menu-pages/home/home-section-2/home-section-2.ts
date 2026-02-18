import { Component, inject, signal, OnInit, effect , ElementRef, Input, AfterViewInit, ViewChild, OnChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker'; 
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterLink } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Homesection2Service } from './home-section-2-services/homesection-2-service';
import { ChoghadiyaResponse } from '../../../interfaces/choghadiya.interface';
import * as THREE from 'three';
@Component({
  selector: 'app-home-section-2',
  standalone: true,
  imports: [FormsModule, DatePickerModule, RouterLink, SelectButtonModule, DatePipe, TitleCasePipe],
  templateUrl: './home-section-2.html',
  styleUrl: './home-section-2.scss'
})
export class HomeSection2 implements OnInit {
  private panchangService = inject(Homesection2Service);

  // State management using signals
  selectedDate = signal<Date>(new Date());
  panchangData = signal<ChoghadiyaResponse | null>(null);
  loading = signal<boolean>(false);
  viewMode = signal<string>('day'); 
latitude = signal<number | null>(null);
longitude = signal<number | null>(null);
  viewOptions = [
    { label: 'day', value: 'day' },
    { label: 'night', value: 'night' }
  ];

zodiacSigns = [
    { name: 'aries', icon: '♈' },
    { name: 'taurus', icon: '♉' },
    { name: 'gemini', icon: '♊' },
    { name: 'cancer', icon: '♋' },
    { name: 'leo', icon: '♌' },
    { name: 'virgo', icon: '♍' },
    { name: 'libra', icon: '♎' },
    { name: 'scorpio', icon: '♏' },
    { name: 'sagittarius', icon: '♐' },
    { name: 'capricorn', icon: '♑' },
    { name: 'aquarius', icon: '♒' },
    { name: 'pisces', icon: '♓' }
  ];
 constructor() {
  effect(() => {
    const date = this.selectedDate();
    const lat = this.latitude();
    const lng = this.longitude();

    if (date && lat && lng) {
      this.fetchData(date);
    }
  });
}


  ngOnInit(): void {
     this.getUserLocation();
  }

  onDateChange(event: any): void {
    const date = event instanceof Date ? event : event.value;
    if (date) {
      this.selectedDate.set(date);
    }
  }
private getUserLocation(): void {
  if (!navigator.geolocation) {
    console.error('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.latitude.set(position.coords.latitude);
      this.longitude.set(position.coords.longitude);
    },
    (error) => {
      console.error('Location permission denied', error);

      // fallback location (optional)
      this.latitude.set(28.4595);
      this.longitude.set(77.0266);
    }
  );
}

private fetchData(date: Date): void {
  const lat = this.latitude();
  const lng = this.longitude();

  if (!lat || !lng) return; // wait until location loaded

  this.loading.set(true);
  this.panchangData.set(null);

  this.panchangService.getChoghadiyaData(date, lat, lng).subscribe({
    next: (data) => {
      this.panchangData.set(data);
      this.loading.set(false);
    },
    error: (err) => {
      console.error('api error:', err);
      this.loading.set(false);
    }
  });
}


}