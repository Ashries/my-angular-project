import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  // Try different API endpoints
  private apiUrl = 'https://restcountries.com/v3.1';
  
  constructor(private http: HttpClient) { }

  // METHOD 1: Try this endpoint (most reliable)
  getAllCountries(): Observable<any[]> {
    console.log('🌐 API CALL: Trying endpoint 1...');
    return this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,languages');
  }

  // METHOD 2: Alternative endpoint
  getAllCountries2(): Observable<any[]> {
    console.log('🌐 API CALL: Trying endpoint 2...');
    return this.http.get<any[]>('https://restcountries.com/v3.1/all');
  }

  // METHOD 3: Minimal data endpoint
  getAllCountriesSimple(): Observable<any[]> {
    console.log('🌐 API CALL: Trying minimal endpoint...');
    return this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,flags');
  }

  getEuropeanCountries(): Observable<any[]> {
    console.log('🌐 API CALL: Getting European countries');
    return this.http.get<any[]>('https://restcountries.com/v3.1/region/europe?fields=name,capital,region,population,flags,languages');
  }

  getFinnishSpeakingCountries(): Observable<any[]> {
    console.log('🌐 API CALL: Getting Finnish-speaking countries');
    return this.http.get<any[]>('https://restcountries.com/v3.1/lang/finnish?fields=name,capital,region,population,flags,languages');
  }

  // Test if API is reachable at all
  testApi(): Observable<any> {
    console.log('🌐 API TEST: Testing connection...');
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}