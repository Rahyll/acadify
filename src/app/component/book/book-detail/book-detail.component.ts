import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookService } from '../../../services/book.service';
import { Book, LoanHistory } from '../../../models/book.model';
import { LoanService } from '../../../services/loan.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { NgClass } from '@angular/common';
import { TitleCasePipe, DatePipe } from '@angular/common';
@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [ProgressSpinner, NgClass, TitleCasePipe, DatePipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
  providers: [MessageService],
})
export class BookDetailComponent {
  book: Book | null = null;
  loanHistory: LoanHistory[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private loanService: LoanService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.loadBookDetails(isbn);
      this.loadLoanHistory(isbn);
    } else {
      this.navigateToCatalog();
    }
  }

  private loadBookDetails(isbn: string): void {
    this.bookService.getBook(isbn).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: (err) => {
        this.showError('Failed to load book details');
        this.navigateToCatalog();
      },
    });
  }

  private loadLoanHistory(isbn: string): void {
    this.loanService.getLoanHistory(isbn).subscribe({
      next: (history) => (this.loanHistory = history),
      error: (err) => this.showError('Failed to load loan history'),
    });
  }

  checkOutBook(): void {
    if (this.book) {
      this.loanService.checkOutBook(this.book.isbn).subscribe({
        next: () => {
          this.book!.available = false;
          this.showSuccess('Book checked out successfully');
          this.loadLoanHistory(this.book!.isbn);
        },
        error: (err) => this.showError('Checkout failed'),
      });
    }
  }

  markAsDamaged(): void {
    // Implementation similar to checkOutBook
  }

  navigateToEdit(): void {
    if (this.book) {
      this.router.navigate(['/librarian/catalog/edit', this.book.isbn]);
    }
  }

  private navigateToCatalog(): void {
    this.router.navigate(['/librarian/catalog']);
  }

  private showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
