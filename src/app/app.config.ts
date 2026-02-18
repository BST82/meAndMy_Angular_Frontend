import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeuix/themes';

const MyCustomPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{orange.50}',
          100: '{orange.100}',
          200: '{orange.200}',
          300: '{orange.300}',
          400: '{orange.400}',
          500: '{orange.500}',
          600: '{orange.600}', // Main theme color
          700: '{orange.700}',
          800: '{orange.800}',
          900: '{orange.900}',
          950: '{orange.950}'
      }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
            options: {
                darkModeSelector: 'none' // Forces light mode for testing
            }
      }
  }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
