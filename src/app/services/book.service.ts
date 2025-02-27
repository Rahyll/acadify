import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksUrl = 'api/books'; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET all books */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap((_) => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  /** GET book by ISBN */
  getBook(isbn: string): Observable<Book> {
    const url = `${this.booksUrl}/${isbn}`;
    return this.http.get<Book>(url).pipe(
      tap((_) => this.log(`fetched book isbn=${isbn}`)),
      catchError(this.handleError<Book>(`getBook isbn=${isbn}`))
    );
  }

  /** POST: add new book */
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: Book) => this.log(`added book w/ isbn=${newBook.isbn}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** PUT: update existing book */
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((_) => this.log(`updated book isbn=${book.isbn}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /** DELETE: remove book */
  deleteBook(isbn: string): Observable<void> {
    const url = `${this.booksUrl}/${isbn}`;
    return this.http.delete<void>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted book isbn=${isbn}`)),
      catchError(this.handleError<void>('deleteBook'))
    );
  }

  /** Search books by term */
  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) return of([]);

    return this.http.get<Book[]>(`${this.booksUrl}/?title=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found books matching "${term}"`)
          : this.log(`no books matching "${term}"`)
      ),
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }

  private log(message: string) {
    console.log(`BookService: ${message}`);
  }
}
