import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-test-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; border: 2px solid #ccc; margin: 20px;">
      <h3>🔥 Firebase Login Test</h3>
      
      <div *ngIf="!firebaseService.getCurrentUser()">
        <h4>Login Form</h4>
        <input [(ngModel)]="email" placeholder="Email" style="margin: 5px;">
        <br>
        <input [(ngModel)]="password" type="password" placeholder="Password" style="margin: 5px;">
        <br>
        <button (click)="login()" [disabled]="isLoading">Login</button>
        
        <div *ngIf="error" style="color: red; margin-top: 10px;">
          {{ error }}
        </div>
      </div>
      
      <div *ngIf="firebaseService.getCurrentUser()">
        <h4>✅ Logged In!</h4>
        <p>User: {{ firebaseService.getUserEmail() }}</p>
        <button (click)="logout()">Logout</button>
      </div>
      
      <div style="margin-top: 20px; background: #f5f5f5; padding: 10px;">
        <h4>Debug Info:</h4>
        <p>Firebase Initialized: {{ firebaseService.getAuth() ? '✅ Yes' : '❌ No' }}</p>
        <p>Current User: {{ firebaseService.getCurrentUser()?.email || 'None' }}</p>
        <p>Is Logged In: {{ firebaseService.isLoggedIn() ? '✅ Yes' : '❌ No' }}</p>
      </div>
    </div>
  `
})
export class TestLoginComponent {
  email = 'admin@example.com';
  password = 'salasana123';
  isLoading = false;
  error = '';

  constructor(public firebaseService: FirebaseService) {}

  async login() {
    this.isLoading = true;
    this.error = '';
    
    try {
      await this.firebaseService.login(this.email, this.password);
      console.log('✅ Login successful from component');
    } catch (error: any) {
      this.error = `Login failed: ${error.code} - ${error.message}`;
      console.error('❌ Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await this.firebaseService.logout();
      console.log('✅ Logout successful from component');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  }
}