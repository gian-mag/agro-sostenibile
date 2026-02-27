import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top" role="navigation" aria-label="Navigazione principale">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <i class="bi bi-leaf me-2"></i>
          <span>Agro Sostenibile</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          (click)="isCollapsed = !isCollapsed"
          [attr.aria-expanded]="!isCollapsed"
          aria-controls="navbarNav"
          aria-label="Toggle navigazione"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" [class.show]="!isCollapsed" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
                <i class="bi bi-house me-1"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/companies" routerLinkActive="active">
                <i class="bi bi-buildings me-1"></i>Aziende
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #fff;
      border-bottom: 2px solid rgba(46, 125, 50, 0.15);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      padding: 0.75rem 0;
    }

    .navbar-brand {
      font-weight: 700;
      font-size: 1.3rem;
      color: var(--color-primary) !important;

      i {
        font-size: 1.5rem;
      }
    }

    .nav-link {
      font-weight: 500;
      color: var(--color-secondary) !important;
      padding: 0.5rem 1rem !important;
      border-radius: 8px;
      transition: all 0.2s;

      &:hover,
      &.active {
        color: var(--color-primary) !important;
        background-color: rgba(46, 125, 50, 0.08);
      }
    }

    .navbar-toggler {
      border: none;
      padding: 0.5rem;

      &:focus {
        box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.25);
      }
    }
  `]
})
export class NavbarComponent {
  isCollapsed = true;
}
