import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main role="main">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container text-center">
          <div class="hero-badge">
            <i class="bi bi-leaf"></i> Sostenibilita nel Settore Primario <i class="bi bi-stars"></i>
          </div>
          <h1 class="hero-title">
            Il Futuro dell'Agricoltura e
            <span class="text-highlight">Sostenibile</span>
          </h1>
          <p class="hero-subtitle">
            Esplora i report di sostenibilita delle principali aziende italiane del settore primario.
            Confronta performance, monitora i progressi e scopri come il settore evolve verso pratiche
            piu responsabili.
          </p>
          <div class="hero-cta">
            <a routerLink="/companies" class="btn btn-primary btn-lg btn-cta">
              <i class="bi bi-search me-2"></i>Esplora Report
            </a>
          </div>
        </div>
      </section>

      <!-- Feature Cards -->
      <section class="features-section">
        <div class="container">
          <div class="row g-4">
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="bi bi-bar-chart-line"></i>
                </div>
                <h3>Analisi Comparative</h3>
                <p>Confronta le performance di sostenibilita tra diversi segmenti: agricoltura,
                   allevamento, pesca e silvicoltura.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="bi bi-bullseye"></i>
                </div>
                <h3>Obiettivi Tracciati</h3>
                <p>Monitora il progresso verso gli obiettivi ESG e gli standard internazionali
                   come GRI, ESRS e SDGs.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="bi bi-globe-americas"></i>
                </div>
                <h3>Impatto Globale</h3>
                <p>Visualizza l'impatto ambientale e sociale delle aziende su scala locale
                   e globale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Context Section -->
      <section class="context-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <h2 class="text-center mb-4">Il Settore Primario e la Sostenibilita</h2>
              <p>
                Il settore primario - agricoltura, allevamento, pesca e silvicoltura - gioca un
                ruolo cruciale nella gestione responsabile delle risorse naturali. La pubblicazione
                dei report di sostenibilita consente alle aziende di mostrare i loro progressi in
                termini di pratiche agricole sostenibili, conformita normativa e responsabilita
                sociale lungo la filiera.
              </p>
              <p>
                Con l'entrata in vigore della <strong>Corporate Sustainability Reporting Directive (CSRD)</strong>
                e degli <strong>European Sustainability Reporting Standards (ESRS)</strong>, la
                rendicontazione di sostenibilita diventa sempre piu centrale per garantire trasparenza
                verso tutti gli stakeholder.
              </p>
              <div class="text-center mt-4">
                <a routerLink="/companies" class="btn btn-outline-primary btn-lg">
                  Scopri le aziende <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .hero-section {
      padding: 5rem 0 4rem;
      background: linear-gradient(180deg, rgba(46, 125, 50, 0.04) 0%, transparent 100%);
    }

    .hero-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--color-primary);
      background: rgba(46, 125, 50, 0.08);
      margin-bottom: 1.5rem;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      color: var(--color-secondary);
      margin-bottom: 1.25rem;
      line-height: 1.15;
    }

    .text-highlight {
      color: var(--color-primary);
      background: linear-gradient(180deg, transparent 60%, rgba(102, 187, 106, 0.25) 60%);
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      max-width: 650px;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }

    .btn-cta {
      background-color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
      border-radius: 12px;
      padding: 0.75rem 2rem;
      font-weight: 600;

      &:hover {
        background-color: var(--color-primary-dark) !important;
        border-color: var(--color-primary-dark) !important;
      }
    }

    .features-section {
      padding: 3rem 0;
    }

    .feature-card {
      background: var(--color-card);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      height: 100%;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-3px);
      }

      h3 {
        font-size: 1.15rem;
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin: 0;
      }
    }

    .feature-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: rgba(46, 125, 50, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      color: var(--color-primary);
    }

    .context-section {
      padding: 4rem 0 5rem;

      h2 {
        font-size: 1.8rem;
      }

      p {
        color: var(--color-text-secondary);
        line-height: 1.8;
        font-size: 1rem;
      }
    }

    .btn-outline-primary {
      color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
      border-radius: 12px;
      font-weight: 600;

      &:hover {
        background-color: var(--color-primary) !important;
        color: #fff !important;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 3rem 0 2.5rem;
      }
      .hero-title {
        font-size: 2rem;
      }
      .hero-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class HomeComponent {}
