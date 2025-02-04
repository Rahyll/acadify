import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() control: FormControl | null = null;
  @Input() label: string = '';
  @Input() for: string = '';
  getErrorMessage(): string {
    if (!this.control) return '';

    const errorMessages: { [key: string]: string } = {
      required: 'This field is required.',
      minlength: `Minimum length is ${
        this.control.getError('minlength')?.requiredLength
      } characters.`,
      maxlength: `Maximum length is ${
        this.control.getError('maxlength')?.requiredLength
      } characters.`,
      email: 'Enter a valid email address.',
    };

    // Check if the control is touched and dirty
    if (this.control.touched && this.control.dirty) {
      for (const errorKey in this.control.errors) {
        if (this.control.hasError(errorKey)) {
          return errorMessages[errorKey] || 'Invalid input.';
        }
      }
    }

    return '';
  }
}
