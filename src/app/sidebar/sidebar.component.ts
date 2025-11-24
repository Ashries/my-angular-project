import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  title: string;
  route?: string;
  children?: { title: string; route: string }[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    {
      title: 'Give Feedback',
      children: [
        { title: 'Template driven form', route: '/feedback' }
      ],
      isExpanded: false
    },
    {
      title: 'Reactive form', 
      route: '/form'
    },
    {
      title: 'Calculator',
      route: '/calculator'
    },
    {
      title: 'Home',
      route: '/'
    },
    {
      title: 'Hello World',
      route: '/hello'
    }
  ];

  constructor(private router: Router) {}

  toggleItem(item: NavItem): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}