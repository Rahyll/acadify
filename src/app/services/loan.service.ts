import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LoanHistory } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private apiUrl = 'api/loans';

  constructor(private http: HttpClient) {}

  getLoanHistory(isbn: string): Observable<LoanHistory[]> {
    return this.http.get<LoanHistory[]>(`${this.apiUrl}?isbn=${isbn}`).pipe(
      catchError(() => of([])) // Return empty array on error
    );
  }

  checkOutBook(isbn: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/checkout`, { isbn }).pipe(
      catchError((err) => {
        throw new Error('Failed to check out book');
      })
    );
  }

  returnBook(isbn: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/return`, { isbn });
  }

  // Add other loan-related methods as needed
}
