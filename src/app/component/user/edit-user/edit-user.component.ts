import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FormFieldComponent } from '../../shared/form-field/form-field.component';
import { MultiSelectModule } from 'primeng/multiselect';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    Select,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    RouterLink,
    FormFieldComponent,
    MultiSelectModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  fb = inject(FormBuilder);

  @Input() formInitialData: any;
  @Output() close = new EventEmitter();

  userForm: FormGroup = this.fb.group({
    role: [null, Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  });

  get role() {
    return this.userForm.get('role') as FormControl;
  }

  get fullName() {
    return this.userForm.get('fullName') as FormControl;
  }

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber') as FormControl;
  }

  get password() {
    return this.userForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword') as FormControl;
  }

  get enrollmentNumber() {
    return this.userForm.get('enrollmentNumber') as FormControl;
  }

  get department() {
    return this.userForm.get('department') as FormControl;
  }

  get courseClass() {
    return this.userForm.get('courseClass') as FormControl;
  }

  get facultyId() {
    return this.userForm.get('facultyId') as FormControl;
  }

  get subjectsAssigned() {
    return this.userForm.get('subjectsAssigned') as FormControl;
  }

  get librarianId() {
    return this.userForm.get('librarianId') as FormControl;
  }

  get childEnrollmentNumber() {
    return this.userForm.get('childEnrollmentNumber') as FormControl;
  }
  get relationshipToChild() {
    return this.userForm.get('relationshipToChild') as FormControl;
  }
  get accountantId() {
    return this.userForm.get('accountantId') as FormControl;
  }

  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Faculty', value: 'faculty' },
    { label: 'Student', value: 'student' },
    { label: 'Parent', value: 'parent' },
    { label: 'Librarian', value: 'librarian' },
    { label: 'Accountant', value: 'accountant' },
  ];

  departments = [
    { label: 'Computer Science', value: 'computer_science' },
    { label: 'Mathematics', value: 'mathematics' },
    { label: 'Physics', value: 'physics' },
    { label: 'Biology', value: 'biology' },
  ];

  courses = [
    { label: 'B.Sc', value: 'bsc' },
    { label: 'M.Sc', value: 'msc' },
    { label: 'Ph.D', value: 'phd' },
  ];

  subjects = [
    { label: 'Math', value: 'math' },
    { label: 'Science', value: 'science' },
    { label: 'History', value: 'history' },
  ];

  relationships = [
    { label: 'Father', value: 'father' },
    { label: 'Mother', value: 'mother' },
    { label: 'Guardian', value: 'guardian' },
  ];

  ngOnInit() {
    this.role.valueChanges.subscribe((val) => {
      this.updateRoleSpecificFields(val);
    });
  }

  private updateRoleSpecificFields(role: string) {
    // Remove previously added role-specific fields
    Object.keys(this.userForm.controls).forEach((key) => {
      if (!['role', 'fullName', 'email', 'phoneNumber'].includes(key)) {
        this.userForm.removeControl(key);
      }
    });

    switch (role) {
      case 'student':
        this.userForm.addControl(
          'enrollmentNumber',
          new FormControl('', Validators.required)
        );
        this.userForm.addControl(
          'courseClass',
          new FormControl('', Validators.required)
        );
        this.userForm.addControl(
          'department',
          new FormControl('', Validators.required)
        );

        console.log(this.userForm);
        break;

      case 'faculty':
        this.userForm.addControl(
          'facultyId',
          new FormControl('', Validators.required)
        );
        this.userForm.addControl(
          'department',
          new FormControl('', Validators.required)
        );
        this.userForm.addControl(
          'subjectsAssigned',
          new FormControl([], Validators.required)
        );
        break;

      case 'parent':
        this.userForm.addControl(
          'childEnrollmentNumber',
          new FormControl('', Validators.required)
        );
        this.userForm.addControl(
          'relationshipToChild',
          new FormControl('', Validators.required)
        );
        break;

      case 'librarian':
        this.userForm.addControl(
          'librarianId',
          new FormControl('', Validators.required)
        );
        break;

      case 'accountant':
        this.userForm.addControl(
          'accountantId',
          new FormControl('', Validators.required)
        );
        break;

      default:
        // No additional fields for 'admin' or unknown roles
        break;
    }
  }

  updateData() {
    console.log(this.userForm);
    this.markControlsAsTouchedAndDirty();
  }

  markControlsAsTouchedAndDirty() {
    // Loop through all form controls and mark them as touched and dirty
    Object.keys(this.userForm.controls).forEach((key) => {
      const control = this.userForm.get(key);
      if (control) {
        control.markAsTouched();
        control.markAsDirty(); // Mark the control as dirty too
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formInitialData'] && this.formInitialData) {
      this.updateRoleSpecificFields(this.formInitialData.role);
      this.userForm.patchValue(this.formInitialData);
    }
  }
}
