import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  template: `
    <app-navbar />
    <app-toast />
    <router-outlet />
    <footer class="app-footer text-center" role="contentinfo">
      <div class="container">
        <p>&copy; 2026 Agro Sostenibile - Project Work Universita Telematica Pegaso</p>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      padding: 2rem 0;
      margin-top: 2rem;
      border-top: 1px solid rgba(0, 0, 0, 0.06);

      p {
        color: var(--color-text-secondary);
        font-size: 0.85rem;
        margin: 0;
      }
    }
  `]
})
export class App {}
