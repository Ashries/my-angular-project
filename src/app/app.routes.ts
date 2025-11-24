import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormComponent } from './form/form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [ // ← Make sure it says 'export const routes'
  { path: '', component: HomeComponent },
  { path: 'hello', component: HelloWorldComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'form', component: FormComponent },
  { path: '**', component: PageNotFoundComponent }
];