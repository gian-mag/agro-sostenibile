import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main role="main">
      <!-- Hero Section - Split Layout -->
      <section class="hero-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 hero-text">
              <h1 class="hero-title">
                Trasparenza e responsabilita nel
                <span class="text-highlight">settore primario</span>
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
            <div class="col-lg-6 d-none d-lg-block hero-visual">
              <div class="blob-composition">
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
                <div class="blob blob-3"></div>
                <i class="bi bi-flower1 blob-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Cards - Horizontal -->
      <section class="features-section">
        <div class="container">
          <div class="row g-4">
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="bi bi-bar-chart-line"></i>
                </div>
                <div class="feature-text">
                  <h3>Analisi Comparative</h3>
                  <p>Confronta le performance di sostenibilita tra diversi segmenti: agricoltura,
                     allevamento, pesca e silvicoltura.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="bi bi-bullseye"></i>
                </div>
                <div class="feature-text">
                  <h3>Obiettivi Tracciati</h3>
                  <p>Monitora il progresso verso gli obiettivi ESG e gli standard internazionali
                     come GRI, ESRS e SDGs.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="bi bi-globe-americas"></i>
                </div>
                <div class="feature-text">
                  <h3>Impatto Globale</h3>
                  <p>Visualizza l'impatto ambientale e sociale delle aziende su scala locale
                     e globale.</p>
                </div>
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
    /* === Hero Split === */
    .hero-section {
      padding: 5rem 0 4rem;
      background-color: var(--color-bg);
    }

    .hero-text {
      padding-right: 3rem;
    }

    .hero-title {
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--color-secondary);
      margin-bottom: 1.25rem;
    }

    .text-highlight {
      color: var(--color-primary);
      border-bottom: 3px solid var(--color-primary-light);
    }

    .hero-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
      line-height: 1.8;
    }

    .btn-cta {
      background-color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
      border-radius: 8px;
      padding: 0.75rem 2rem;
      font-weight: 600;

      &:hover {
        background-color: var(--color-primary-dark) !important;
        border-color: var(--color-primary-dark) !important;
      }
    }

    /* === Blob Composition === */
    .hero-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .blob-composition {
      position: relative;
      width: 380px;
      height: 380px;
    }

    .blob {
      position: absolute;
      border-radius: 50% 40% 60% 45%;
    }

    .blob-1 {
      width: 260px;
      height: 260px;
      background: rgba(180, 83, 9, 0.15);
      top: 20px;
      left: 60px;
      animation: morphBlob 8s ease-in-out infinite;
    }

    .blob-2 {
      width: 200px;
      height: 200px;
      background: rgba(30, 58, 47, 0.12);
      top: 100px;
      left: 10px;
      border-radius: 40% 55% 45% 60%;
      animation: morphBlob 10s ease-in-out infinite reverse;
    }

    .blob-3 {
      width: 160px;
      height: 160px;
      background: rgba(217, 119, 6, 0.1);
      top: 40px;
      right: 20px;
      border-radius: 55% 45% 50% 40%;
      animation: morphBlob 12s ease-in-out infinite;
    }

    .blob-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3.5rem;
      color: var(--color-primary);
      opacity: 0.6;
    }

    @keyframes morphBlob {
      0%, 100% { border-radius: 50% 40% 60% 45%; }
      25% { border-radius: 40% 60% 45% 55%; }
      50% { border-radius: 60% 45% 50% 40%; }
      75% { border-radius: 45% 50% 40% 60%; }
    }

    /* === Feature Cards Horizontal === */
    .features-section {
      padding: 3rem 0;
    }

    .feature-card {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: var(--color-card);
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid var(--color-card-border);
      height: 100%;
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--color-primary-light);
      }

      h3 {
        font-size: 1.1rem;
        margin-bottom: 0.4rem;
      }

      p {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.6;
      }
    }

    .feature-icon {
      width: 48px;
      height: 48px;
      min-width: 48px;
      border-radius: 50%;
      background: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: #fff;
    }

    /* === Context Section === */
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
      border-radius: 8px;
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
      .hero-text {
        padding-right: 0;
        text-align: center;
      }
      .hero-title {
        font-size: 2rem;
      }
      .hero-subtitle {
        font-size: 1rem;
      }
      .hero-cta {
        text-align: center;
      }
      .feature-card {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  `]
})
export class HomeComponent {}
