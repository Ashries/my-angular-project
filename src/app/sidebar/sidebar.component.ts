import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule, 
    MatListModule, 
    MatIconModule, 
    MatToolbarModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  feedbackExpanded = false;

  // Navigation items array
  navItems = [
    {
      title: 'Give Feedback',
      icon: 'feedback',
      children: [
        { title: 'Template driven form', route: '/feedback', icon: 'format_list_bulleted' }
      ],
      isExpanded: false
    },
    {
      title: 'Reactive form',
      icon: 'dynamic_form',
      route: '/form'
    },
    {
      title: 'Calculator',
      icon: 'calculate',
      route: '/calculator'
    },
    {
      title: 'Home',
      icon: 'home',
      route: '/'
    },
    {
      title: 'Hello World',
      icon: 'waving_hand',
      route: '/hello'
    },
    {
      title: 'Countries API',
      icon: 'flag',
      route: '/countries' // ← NEW ITEM ADDED HERE
    }
  ];

  toggleFeedback() {
    this.feedbackExpanded = !this.feedbackExpanded;
  }

  // Method to toggle any item with children
  toggleItem(item: any) {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }
}