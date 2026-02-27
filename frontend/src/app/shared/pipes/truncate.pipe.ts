import { Pipe, PipeTransform } from '@angular/core';

// Tronca il testo a una lunghezza massima aggiungendo "..."
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 150, trail = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit).trim() + trail : value;
  }
}
