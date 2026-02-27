import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top" role="navigation" aria-label="Navigazione principale">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <i class="bi bi-compass me-2"></i>
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
          <ul class="navbar-nav ms-auto gap-2">
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
      background-color: var(--color-secondary);
      padding: 0.75rem 0;
    }

    .navbar-brand {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1.3rem;
      color: #F5EDE0 !important;

      i {
        font-size: 1.5rem;
        color: var(--color-primary-light);
      }
    }

    .nav-link {
      font-weight: 600;
      font-size: 0.95rem;
      color: rgba(245, 237, 224, 0.75) !important;
      padding: 0.5rem 1.1rem !important;
      border-radius: 8px;
      transition: all 0.2s;

      &:hover {
        color: #FBF7F0 !important;
        background-color: rgba(180, 83, 9, 0.25);
      }

      &.active {
        color: #FBF7F0 !important;
        background-color: rgba(180, 83, 9, 0.35);
      }
    }

    .navbar-toggler {
      border: 1px solid rgba(245, 237, 224, 0.3);
      padding: 0.5rem;

      &:focus {
        box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.35);
      }
    }
  `]
})
export class NavbarComponent {
  isCollapsed = true; // stato hamburger menu su mobile
}
