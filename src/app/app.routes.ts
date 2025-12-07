import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormComponent } from './form/form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CountriesComponent } from './countries/countries.component'; // ← ADD THIS

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hello', component: HelloWorldComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'form', component: FormComponent },
  { path: 'countries', component: CountriesComponent }, // ← ADD THIS ROUTE
  { path: '**', component: PageNotFoundComponent }
];