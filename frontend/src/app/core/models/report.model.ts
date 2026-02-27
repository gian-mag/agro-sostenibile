export interface Report {
  id: number;
  companyId: number;
  title: string;
  year: number;
  pdfUrl: string;
  pdfFileName?: string;
  summary?: string;
  standard?: string;
  tags?: string;
}
