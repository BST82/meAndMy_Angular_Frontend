import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { HomeSection1 } from "./home-section-1/home-section-1";
import { HomeSection2 } from "./home-section-2/home-section-2";
import { HomeSection3 } from "./home-section-3/home-section-3";
import { HomeSection4 } from "./home-section-4/home-section-4";

@Component({
  selector: 'app-home', // Ensure you have a selector
  standalone: true,    // Required if you are using the 'imports' array
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    HomeSection1,
    HomeSection2,
    HomeSection3,
    HomeSection4
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  homeData: any;

  ngOnInit(): void {
   
}
}