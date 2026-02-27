// Rappresenta un'azienda del settore primario
export interface Company {
  id: number;
  companyName: string;
  segment: string; // es. Agricoltura, Allevamento, Pesca, Silvicoltura, Agroalimentare
  description: string;
  history?: string;
  logoUrl?: string;
  websiteUrl?: string;
}
