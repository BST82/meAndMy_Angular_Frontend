import { Component, inject, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { HeaderFooterService } from '../../services/header-footer/header-footer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  private headerService = inject(HeaderFooterService);

  menu = this.headerService.menu;

  constructor() {
    this.headerService.getHeaderMenu().subscribe();
  }

  menubarItems = computed<MenuItem[]>(() => {
    const rawMenu = this.menu();
    if (!rawMenu) return [];

    return rawMenu.map((item: any): MenuItem => {
      // 🔹 Simple page
      if (item.type === 'page') {
        return {
          label: item.name,
          routerLink: item.slug,
           routerLinkActiveOptions: { exact: true }
        };
      }

      // 🔹 Dropdown (City)
      return {
        label: item.name,
        items: item.cities.map((city: any) => ({
          label: city.name,
          items: city.places.length
            ? city.places.map((place: any) => ({
                label: place.name,
                routerLink: `/${city.slug}/${place.slug}`
              }))
            : [
                {
                  label: 'No places',
                  disabled: true
                }
              ]
        }))
      };
    });
  });
}
