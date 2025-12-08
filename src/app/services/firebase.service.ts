import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: any;
  private auth: Auth | undefined;
  currentUser: User | null = null;

  constructor() {
    console.log('FirebaseService constructor - config:', environment.firebaseConfig);
    
    try {
      // Initialize Firebase
      this.app = initializeApp(environment.firebaseConfig);
      this.auth = getAuth(this.app);
      
      // Listen to auth state changes
      onAuthStateChanged(this.auth, (user) => {
        this.currentUser = user;
        console.log('🔥 Firebase Auth State:', user?.email || 'No user');
      });
      
      console.log('✅ Firebase Service initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
    }
  }

  private ensureAuthInitialized(): Auth {
    if (!this.auth) {
      throw new Error('Firebase Auth not initialized');
    }
    return this.auth;
  }

  async login(email: string, password: string): Promise<User> {
    try {
      console.log('Attempting login for:', email);
      const auth = this.ensureAuthInitialized();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful for:', userCredential.user.email);
      return userCredential.user;
    } catch (error: any) {
      console.error('Login error:', error.code, error.message);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const auth = this.ensureAuthInitialized();
      await signOut(auth);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getUserEmail(): string | null {
    return this.currentUser?.email || null;
  }

  getAuth(): Auth | undefined {
    return this.auth;
  }
}