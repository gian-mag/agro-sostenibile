// Report di sostenibilita associato a un'azienda
export interface Report {
  id: number;
  companyId: number;
  title: string;
  year: number;
  pdfUrl: string;
  pdfFileName?: string;
  summary?: string;
  standard?: string; // standard di rendicontazione (CSRD, ESRS, ecc.)
  tags?: string; // tag separati da virgola
}
