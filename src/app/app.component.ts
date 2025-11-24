import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component'; // ← ADD THIS
import { CommonModule } from '@angular/common'; // ← ADD THIS

@Component({
  selector: 'app-root',
  standalone: true, // ← Make sure this is here if using standalone
  imports: [RouterOutlet, SidebarComponent, CommonModule], // ← ADD SidebarComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-project';
}