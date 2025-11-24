import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { Person } from '../person';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  person: Person = new Person();

  // Validointifunktiot
  isFirstNameValid(): boolean {
    return /^[A-Za-zäöåÄÖÅ]{2,}$/.test(this.person.firstName);
  }

  isLastNameValid(): boolean {
    return /^[A-Za-zäöåÄÖÅ]{2,}$/.test(this.person.lastName);
  }

  isEmailValid(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.person.email);
  }

  isUsernameValid(): boolean {
    return this.person.username.length >= 6;
  }

  isPasswordValid(): boolean {
    return this.person.password.length >= 10 && 
           /[A-Z]/.test(this.person.password) && 
           /[0-9]/.test(this.person.password);
  }

  isConfirmPasswordValid(): boolean {
    return this.person.password === this.person.confirmPassword && this.person.confirmPassword !== '';
  }

  isSsnValid(): boolean {
    // Yksinkertaistettu henkilötunnuksen validointi
    return /^[0-9]{6}[-+A][0-9]{3}[0-9A-Z]$/.test(this.person.ssn);
  }

  isFormValid(): boolean {
    return this.isFirstNameValid() &&
           this.isLastNameValid() &&
           this.isEmailValid() &&
           this.isUsernameValid() &&
           this.isPasswordValid() &&
           this.isConfirmPasswordValid() &&
           this.isSsnValid() &&
           this.person.acceptTerms;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Lomake lähetetty onnistuneesti!', this.person);
      alert('Lomake lähetetty onnistuneesti!');
      // Tässä voit lähettää datan palvelimelle
    }
  }
}