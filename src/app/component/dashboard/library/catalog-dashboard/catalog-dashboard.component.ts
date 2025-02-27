import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BookFormComponent } from '../../../book/book-form/book-form.component';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookService } from '../../../../services/book.service';
import { FormsModule } from '@angular/forms';
import { Tag } from 'primeng/tag';
import { Book } from '../../../../models/book.model';

@Component({
  selector: 'app-catalog-dashboard',
  standalone: true,
  imports: [
    TableModule,
    Select,
    SelectButton,
    ButtonModule,
    Dialog,
    ConfirmDialog,
    BookFormComponent,
    Select,
    FormsModule,
    Tag,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './catalog-dashboard.component.html',
  styleUrl: './catalog-dashboard.component.scss',
})
export class CatalogDashboardComponent {
  books: Book[] = [
    {
      isbn: '978-3-16-148410-0',
      title: 'The Pragmatic Programmer',
      authors: ['Andrew Hunt', 'David Thomas'],
      category: 'Programming',
      available: true,
      publicationYear: 1999,
      publisher: 'Addison-Wesley',
    },
    {
      isbn: '978-0-201-63361-0',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      authors: [
        'Erich Gamma',
        'Richard Helm',
        'Ralph Johnson',
        'John Vlissides',
      ],
      category: 'Software Engineering',
      available: false,
      publicationYear: 1994,
      publisher: 'Addison-Wesley',
    },
    {
      isbn: '978-1-59327-584-6',
      title: 'Eloquent JavaScript',
      authors: ['Marijn Haverbeke'],
      category: 'JavaScript',
      available: true,
      publicationYear: 2018,
      publisher: 'No Starch Press',
    },
    {
      isbn: '978-0-13-110362-7',
      title: 'The C Programming Language',
      authors: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
      category: 'Programming',
      available: true,
      publicationYear: 1988,
      publisher: 'Prentice Hall',
    },
    {
      isbn: '978-1-491-94748-5',
      title: "You Don't Know JS: Scope & Closures",
      authors: ['Kyle Simpson'],
      category: 'JavaScript',
      available: false,
      publicationYear: 2014,
      publisher: "O'Reilly Media",
    },
    {
      isbn: '978-0-07-161586-0',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      authors: ['Robert C. Martin'],
      category: 'Software Development',
      available: true,
      publicationYear: 2008,
      publisher: 'Prentice Hall',
    },
    {
      isbn: '978-1-491-94625-9',
      title: 'Node.js Design Patterns',
      authors: ['Mario Casciaro'],
      category: 'Node.js',
      available: true,
      publicationYear: 2020,
      publisher: 'Packt Publishing',
    },
    {
      isbn: '978-1-118-99988-2',
      title: 'JavaScript: The Good Parts',
      authors: ['Douglas Crockford'],
      category: 'JavaScript',
      available: false,
      publicationYear: 2008,
      publisher: "O'Reilly Media",
    },
    {
      isbn: '978-1-59327-757-4',
      title: 'Python Crash Course',
      authors: ['Eric Matthes'],
      category: 'Python',
      available: true,
      publicationYear: 2019,
      publisher: 'No Starch Press',
    },
    {
      isbn: '978-1-4493-7310-3',
      title: 'Learning React',
      authors: ['Alex Banks', 'Eve Porcello'],
      category: 'React.js',
      available: true,
      publicationYear: 2020,
      publisher: "O'Reilly Media",
    },
  ];

  // Add 10 more entries to complete the list of 20
  filteredBooks: Book[] = [];
  selectedCategory: string | null = null;
  searchQuery = '';
  showDialog = false;
  editMode = false;
  selectedBook: Book | null = null;

  categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History'];
  availabilityOptions = [
    { label: 'All', value: 'all' },
    { label: 'Available', value: 'available' },
  ];

  selectedAvailability = 'all';

  private destroy$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBooks();
    // this.setupSearch();
  }

  private loadBooks() {
    this.bookService
      .getBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (books) => {
          this.books = books;
          this.filterBooks();
        },
        error: (err) => this.showError('Failed to load books'),
      });
  }

  // private setupSearch() {
  //   this.bookService.searchBooks
  //     .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
  //     .subscribe(() => this.filterBooks());
  // }

  filterBooks() {
    this.filteredBooks = this.books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.isbn.includes(this.searchQuery);
      const matchesCategory =
        !this.selectedCategory || book.category === this.selectedCategory;
      const matchesAvailability =
        this.selectedAvailability === 'all' ||
        (this.selectedAvailability === 'available' && book.available);

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }

  showAddDialog() {
    this.editMode = false;
    this.selectedBook = null;
    this.showDialog = true;
  }

  editBook(book: Book) {
    this.selectedBook = { ...book };
    this.editMode = true;
    this.showDialog = true;
  }

  confirmDelete(book: Book) {
    this.confirmationService.confirm({
      message: `Delete "${book.title}" (ISBN: ${book.isbn})?`,
      header: 'Confirm Delete',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => this.deleteBook(book.isbn),
    });
  }

  private deleteBook(isbn: string) {
    this.bookService
      .deleteBook(isbn)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.books = this.books.filter((b) => b.isbn !== isbn);
          this.filterBooks();
          this.showSuccess('Book deleted successfully');
        },
        error: () => this.showError('Failed to delete book'),
      });
  }

  handleSubmit(book: Book) {
    const operation = this.editMode
      ? this.bookService.updateBook(book)
      : this.bookService.addBook(book);

    operation.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loadBooks();
        this.showDialog = false;
        this.showSuccess(
          `Book ${this.editMode ? 'updated' : 'added'} successfully`
        );
      },
      error: () =>
        this.showError(`Failed to ${this.editMode ? 'update' : 'add'} book`),
    });
  }

  navigateToDetail(isbn: string) {
    this.router.navigate(['/catalog', isbn]);
  }

  private showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
