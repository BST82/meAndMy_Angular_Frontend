import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { HomeSection3Service } from './home-section-3-service/home-section-3-service';
import { Muhurat, MuhuratResponse } from '../../../interfaces/monthwiseMuhurt.interfact';

@Component({
  selector: 'app-home-section-3',
  standalone: true,
  imports: [CommonModule, CarouselModule, TagModule],
  templateUrl: './home-section-3.html',
  styleUrl: './home-section-3.scss'
})
export class HomeSection3 implements OnInit {
  private service = inject(HomeSection3Service);

  muhurats = signal<Muhurat[]>([]);
  // Signals to hold the dynamic title data
  currentMonth = signal<string>('');
  currentYear = signal<number | null>(null);

  responsiveOptions: any[] = [
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
  ];

  ngOnInit() {
    this.loadMuhurat();
  }

  loadMuhurat() {
    this.service.getCurrentMonthMuhurat().subscribe(res => {
      // Assuming res is the object containing { month, year, data }
      this.currentMonth.set(res.month);
      this.currentYear.set(res.year);
      this.muhurats.set(res.data);
    });
  }
}