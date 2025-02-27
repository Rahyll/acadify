export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  category: string;
  edition?: number;
  publicationYear: number;
  publisher: string;
  description?: string;
  coverUrl?: string;
  available: boolean;
  // totalCopies: number;
  // availableCopies: number;
}

export interface LoanHistory {
  date: Date;
  user: string;
  userType: 'student' | 'faculty' | 'staff';
  status: 'checked-out' | 'returned' | 'renewed' | 'damaged';
  dueDate?: Date;
}
