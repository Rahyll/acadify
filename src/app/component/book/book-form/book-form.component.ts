import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../models/book.model';
import { Editor } from 'primeng/editor';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { InputNumber } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    Editor,
    Select,
    Button,
    Chip,
    InputNumber,
    ReactiveFormsModule,
    ToggleSwitch,
    InputTextModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  @Input() set book(value: Book | null) {
    if (value) this.form.patchValue(value);
  }
  @Output() submit = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History'];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      isbn: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
      available: [true],
      title: ['', Validators.required],
      authors: [[], Validators.required],
      category: ['', Validators.required],
      publicationYear: [
        new Date().getFullYear(),
        [
          Validators.required,
          Validators.min(1800),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      publisher: [''],
      description: [''],
      coverUrl: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
