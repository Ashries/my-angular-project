import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[];
  startOfWeek: string;
  area: number;
  independent: boolean;
  unMember: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  // Get all countries
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all`);
  }

  // Get countries by language (e.g., 'finnish', 'english')
  getCountriesByLanguage(language: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/lang/${language}`);
  }

  // Get countries by region (e.g., 'europe', 'asia')
  getCountriesByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`);
  }

  // Get country by name
  getCountryByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${name}`);
  }

  // Get European countries sorted by population
  getEuropeanCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/europe`).pipe(
      map(countries => countries.sort((a, b) => b.population - a.population))
    );
  }

  // Get countries that speak Finnish
  getFinnishSpeakingCountries(): Observable<Country[]> {
    return this.getCountriesByLanguage('finnish');
  }

  // Get UN member countries
  getUNMemberCountries(): Observable<Country[]> {
    return this.getAllCountries().pipe(
      map(countries => countries.filter(country => country.unMember))
    );
  }

  // Get countries with area larger than...
  getCountriesByMinArea(minArea: number): Observable<Country[]> {
    return this.getAllCountries().pipe(
      map(countries => countries.filter(country => country.area > minArea))
    );
  }
}