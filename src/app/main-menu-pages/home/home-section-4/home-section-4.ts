import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HomeSection4Service } from './home-section-4-service/home-section-4-service'; 
import { Festival } from '../../../interfaces/festival.model'; 

@Component({
  selector: 'app-home-section-4',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './home-section-4.html',
  styleUrl: './home-section-4.scss',
})
export class HomeSection4 implements OnInit {
  festivals: Festival[] = [];
  loading = false;

  constructor(private festivalService: HomeSection4Service) {}

  ngOnInit(): void {
    this.loadFestivals();
  }

  // Helper to get the local image path based on the index
  getFestivalImage(index: number): string {
    // This creates "01", "02", etc. and cycles every 6 items
    const imageNumber = ((index % 6) + 1).toString().padStart(2, '0');
    return `assets/home-page-images/${imageNumber}.jpg`;
  }

  loadFestivals() {
    this.loading = true;
    this.festivalService.getFestivals().subscribe({
      next: (res) => {
        this.festivals = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Festival API error', err);
        this.loading = false;
      },
    });
  }
}
