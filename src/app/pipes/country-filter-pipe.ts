import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFilter',
  standalone: true
})
export class CountryFilterPipe implements PipeTransform {
  transform(countries: any[], search: string): any[] {
    if (!countries || !search || search.trim() === '') {
      return countries;
    }
    
    const searchLower = search.toLowerCase().trim();
    
    return countries.filter(country => {
      // Search by country name
      const nameMatch = country.name.common.toLowerCase().includes(searchLower);
      
      // Search by capital
      const capitalMatch = country.capital?.some((cap: string) => 
        cap.toLowerCase().includes(searchLower)
      ) || false;
      
      // Search by region
      const regionMatch = country.region.toLowerCase().includes(searchLower);
      
      return nameMatch || capitalMatch || regionMatch;
    });
  }
}