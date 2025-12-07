import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px;">
      <h1 style="color: #3f51b5;">🌍 Maat API-testi</h1>
      
      <!-- Debug Info -->
      <div style="background: #e3f2fd; padding: 15px; margin: 15px 0; border-radius: 5px;">
        <h3 style="margin-top: 0;">📊 Tila:</h3>
        <p><strong>Ladataanko:</strong> {{ isLoading ? 'KYLLÄ' : 'EI' }}</p>
        <p><strong>Virhe:</strong> {{ error || 'Ei virheitä' }}</p>
        <p><strong>Maat ladattu:</strong> {{ countries.length }}</p>
        <p><strong>Näytetään:</strong> {{ filteredCountries.length }}</p>
      </div>

      <!-- Search -->
      <div style="margin: 20px 0;">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          (input)="onSearch()"
          placeholder="Hae maita..."
          style="width: 100%; padding: 10px; font-size: 16px; border: 2px solid #3f51b5; border-radius: 5px;">
      </div>

      <!-- Buttons -->
      <div style="display: flex; gap: 10px; margin: 20px 0;">
        <button (click)="loadEuropeanCountries()" 
                [disabled]="isLoading"
                style="padding: 10px 20px; background: #3f51b5; color: white; border: none; border-radius: 5px;">
          🇪🇺 Euroopan maat
        </button>
        <button (click)="loadFinnishSpeakingCountries()" 
                [disabled]="isLoading"
                style="padding: 10px 20px; background: #ff4081; color: white; border: none; border-radius: 5px;">
          🇫🇮 Suomenkieliset
        </button>
        <button (click)="resetFilters()"
                style="padding: 10px 20px; background: #757575; color: white; border: none; border-radius: 5px;">
          🔄 Tyhjennä
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="isLoading" style="text-align: center; padding: 40px;">
        <div style="font-size: 24px;">⏳</div>
        <p>Ladataan maita...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error && !isLoading" style="background: #ffebee; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #d32f2f;">❌ Virhe</h3>
        <p>{{ error }}</p>
        <button (click)="loadCountries()"
                style="padding: 10px 20px; background: #d32f2f; color: white; border: none; border-radius: 5px;">
          🔄 Yritä uudelleen
        </button>
      </div>

      <!-- Countries List -->
      <div *ngIf="!isLoading && !error">
        <h3>Löytyi {{ filteredCountries.length }} maata:</h3>
        
        <div *ngIf="filteredCountries.length === 0" style="text-align: center; padding: 40px;">
          <p>Ei maita löytynyt</p>
        </div>

        <div *ngFor="let country of filteredCountries" style="margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
          
          <!-- Flag -->
          <div *ngIf="country.flags?.png" style="text-align: center; margin-bottom: 15px;">
            <img [src]="country.flags.png" 
                 [alt]="country.name.common"
                 style="width: 150px; border: 1px solid #ccc; border-radius: 3px;">
          </div>
          
          <h3 style="color: #3f51b5; margin-top: 0;">{{ country.name.common }}</h3>
          <p><strong>Virallinen nimi:</strong> {{ country.name.official }}</p>
          <p><strong>Pääkaupunki:</strong> {{ country.capital?.[0] || 'Ei pääkaupunkia' }}</p>
          <p><strong>Alue:</strong> {{ country.region }}</p>
          <p><strong>Väkiluku:</strong> {{ formatPopulation(country.population) }}</p>
          <p><strong>Kielet:</strong> {{ getLanguages(country.languages) }}</p>
          
          <div style="margin-top: 10px; color: #666; font-size: 0.9em;">
            ID: {{ country.name.common.toLowerCase().replace(' ', '-') }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  isLoading = true;
  error = '';
  searchTerm = '';

  constructor(private countriesService: CountriesService) {
    console.log('✅ Component created');
  }

  ngOnInit(): void {
    console.log('✅ ngOnInit called');
    this.loadCountries();
  }

  loadCountries(): void {
    console.log('🔄 Loading countries...');
    this.isLoading = true;
    this.error = '';
    
    this.countriesService.getAllCountries().subscribe({
      next: (data) => {
        console.log('✅ Data received:', data?.length, 'countries');
        console.log('📊 Sample country:', data[0]);
        
        if (data && Array.isArray(data)) {
          this.countries = data;
          this.filteredCountries = [...data];
          console.log('✅ Countries set:', this.countries.length);
        } else {
          console.error('❌ Data is not an array:', data);
          this.error = 'Invalid data received';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error loading countries:', err);
        this.error = `Virhe: ${err.status || 'Unknown'} - ${err.message || 'API error'}`;
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCountries = [...this.countries];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter(country => 
      country.name.common.toLowerCase().includes(term)
    );
  }

  loadEuropeanCountries(): void {
    console.log('🌍 Loading European countries...');
    this.isLoading = true;
    this.countriesService.getEuropeanCountries().subscribe({
      next: (data) => {
        console.log('✅ European countries loaded:', data?.length);
        this.countries = data;
        this.filteredCountries = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error loading European countries:', err);
        this.error = 'Virhe Euroopan maiden latauksessa';
        this.isLoading = false;
      }
    });
  }

  loadFinnishSpeakingCountries(): void {
    console.log('🇫🇮 Loading Finnish-speaking countries...');
    this.isLoading = true;
    this.countriesService.getFinnishSpeakingCountries().subscribe({
      next: (data) => {
        console.log('✅ Finnish-speaking countries loaded:', data?.length);
        this.countries = data;
        this.filteredCountries = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error loading Finnish-speaking countries:', err);
        this.error = 'Virhe suomenkielisten maiden latauksessa';
        this.isLoading = false;
      }
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filteredCountries = [...this.countries];
  }

  formatPopulation(population: number): string {
    return population?.toLocaleString('fi-FI') || '0';
  }

  getLanguages(languages: any): string {
    if (!languages) return 'N/A';
    try {
      return Object.values(languages).join(', ');
    } catch {
      return 'N/A';
    }
  }
}