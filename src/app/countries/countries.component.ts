import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountriesService, Country } from '../services/countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  isLoading = true;
  error = '';
  currentDate = new Date();
  
  regions: string[] = ['All', 'Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Antarctic'];
  selectedRegion = 'All';
  
  sortOptions: string[] = ['Name (A-Z)', 'Name (Z-A)', 'Population (High to Low)', 'Population (Low to High)', 'Area (Large to Small)', 'Area (Small to Large)'];
  selectedSort = 'Name (A-Z)';
  
  searchTerm = '';

  constructor(
    private countriesService: CountriesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.isLoading = true;
    this.error = '';
    
    this.countriesService.getAllCountries().subscribe({
      next: (data) => {
        console.log('Countries loaded:', data.length, 'countries');
        this.countries = data;
        this.filteredCountries = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading countries:', err);
        this.error = 'Failed to load countries. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.countries];

    if (this.selectedRegion !== 'All') {
      result = result.filter(country => 
        country.region.toLowerCase() === this.selectedRegion.toLowerCase()
      );
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(term) ||
        country.name.official.toLowerCase().includes(term) ||
        (country.capital && country.capital.some(cap => cap.toLowerCase().includes(term)))
      );
    }

    switch (this.selectedSort) {
      case 'Name (A-Z)':
        result.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
      case 'Name (Z-A)':
        result.sort((a, b) => b.name.common.localeCompare(a.name.common));
        break;
      case 'Population (High to Low)':
        result.sort((a, b) => b.population - a.population);
        break;
      case 'Population (Low to High)':
        result.sort((a, b) => a.population - b.population);
        break;
      case 'Area (Large to Small)':
        result.sort((a, b) => (b.area || 0) - (a.area || 0));
        break;
      case 'Area (Small to Large)':
        result.sort((a, b) => (a.area || 0) - (b.area || 0));
        break;
    }

    this.filteredCountries = result;
  }

  onRegionChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.selectedRegion = 'All';
    this.selectedSort = 'Name (A-Z)';
    this.searchTerm = '';
    this.applyFilters();
  }

  loadEuropeanCountries(): void {
    this.isLoading = true;
    this.countriesService.getEuropeanCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = [...data];
        this.selectedRegion = 'Europe';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading European countries:', err);
        this.error = 'Failed to load European countries.';
        this.isLoading = false;
      }
    });
  }

  loadFinnishSpeakingCountries(): void {
    this.isLoading = true;
    this.countriesService.getFinnishSpeakingCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = [...data];
        this.selectedRegion = 'All';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading Finnish-speaking countries:', err);
        this.error = 'Failed to load Finnish-speaking countries.';
        this.isLoading = false;
      }
    });
  }

  formatPopulation(population: number): string {
    return population.toLocaleString('fi-FI');
  }

  formatArea(area: number): string {
    return area ? area.toLocaleString('fi-FI') + ' km²' : 'N/A';
  }

  getLanguages(languages: { [key: string]: string }): string {
    if (!languages) return 'N/A';
    
    const languageNames = Object.values(languages);
    return languageNames.join(', ');
  }

  getCurrencies(currencies: { [key: string]: { name: string; symbol: string } }): string {
    if (!currencies) return 'N/A';
    
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
      .join(', ');
  }

  getFormattedDate(): string {
    return this.datePipe.transform(this.currentDate, 'fullDate', undefined, 'fi') || '';
  }
}