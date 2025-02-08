import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { InputMask } from 'primeng/inputmask';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { Fieldset } from 'primeng/fieldset';
import { FormFieldComponent } from '../../shared/form-field/form-field.component';

@Component({
  selector: 'app-add-students',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    Select,
    ButtonModule,
    FormFieldComponent,
    Fieldset,
    DatePicker,
    InputMask,
    TextareaModule,
    FileUpload,
    // Checkbox,
    // RadioButton,
  ],
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.scss',
})
export class AddStudentsComponent {
  private fb = inject(FormBuilder);
  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    studentId: ['', Validators.required],
    enrollmentNumber: ['', Validators.required],
    admissionDate: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    parentName: ['', Validators.required],
    parentContact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    permanentAddress: ['', Validators.required],
    currentAddress: ['', Validators.required],
    courseName: ['', Validators.required],
    department: ['', Validators.required],
    yearOfStudy: ['', Validators.required],
    section: ['', Validators.required],
    rollNumber: ['', Validators.required],
    previousSchool: ['', Validators.required],
    lastExamPercentage: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
    ],
    uploadPhoto: [null, Validators.required],
    uploadIdProof: [null, Validators.required],
    uploadMarksheet: [null, Validators.required],
    hostelRequired: ['No'],
    scholarshipStatus: ['No'],
    medicalConditions: [''],
  });

  // Getters for form controls
  get firstName() {
    return this.studentForm.get('firstName') as FormControl;
  }
  get middleName() {
    return this.studentForm.get('middleName') as FormControl;
  }
  get lastName() {
    return this.studentForm.get('lastName') as FormControl;
  }
  get dateOfBirth() {
    return this.studentForm.get('dateOfBirth') as FormControl;
  }
  get gender() {
    return this.studentForm.get('gender') as FormControl;
  }
  get nationality() {
    return this.studentForm.get('nationality') as FormControl;
  }
  get studentId() {
    return this.studentForm.get('studentId') as FormControl;
  }
  get enrollmentNumber() {
    return this.studentForm.get('enrollmentNumber') as FormControl;
  }
  get admissionDate() {
    return this.studentForm.get('admissionDate') as FormControl;
  }
  get email() {
    return this.studentForm.get('email') as FormControl;
  }
  get phoneNumber() {
    return this.studentForm.get('phoneNumber') as FormControl;
  }
  get parentName() {
    return this.studentForm.get('parentName') as FormControl;
  }
  get parentContact() {
    return this.studentForm.get('parentContact') as FormControl;
  }
  get permanentAddress() {
    return this.studentForm.get('permanentAddress') as FormControl;
  }
  get currentAddress() {
    return this.studentForm.get('currentAddress') as FormControl;
  }
  get courseName() {
    return this.studentForm.get('courseName') as FormControl;
  }
  get department() {
    return this.studentForm.get('department') as FormControl;
  }
  get yearOfStudy() {
    return this.studentForm.get('yearOfStudy') as FormControl;
  }
  get section() {
    return this.studentForm.get('section') as FormControl;
  }
  get rollNumber() {
    return this.studentForm.get('rollNumber') as FormControl;
  }
  get previousSchool() {
    return this.studentForm.get('previousSchool') as FormControl;
  }
  get lastExamPercentage() {
    return this.studentForm.get('lastExamPercentage') as FormControl;
  }
  get uploadPhoto() {
    return this.studentForm.get('uploadPhoto') as FormControl;
  }
  get uploadIdProof() {
    return this.studentForm.get('uploadIdProof') as FormControl;
  }
  get uploadMarksheet() {
    return this.studentForm.get('uploadMarksheet') as FormControl;
  }
  get hostelRequired() {
    return this.studentForm.get('hostelRequired') as FormControl;
  }
  get scholarshipStatus() {
    return this.studentForm.get('scholarshipStatus') as FormControl;
  }
  get medicalConditions() {
    return this.studentForm.get('medicalConditions') as FormControl;
  }

  genders = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Other', value: 'Other' },
  ];

  hostelOptions = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  scholarshipOptions = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  courses = [
    { label: 'B.Sc', value: 'bsc' },
    { label: 'M.Sc', value: 'msc' },
    { label: 'Ph.D', value: 'phd' },
  ];

  departments = [
    { label: 'Computer Science', value: 'computer_science' },
    { label: 'Mathematics', value: 'mathematics' },
    { label: 'Physics', value: 'physics' },
    { label: 'Biology', value: 'biology' },
  ];

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        [controlName]: file,
      });
    }
  }

  submitForm() {
    if (this.studentForm.valid) {
      console.log('Student Data:', this.studentForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  resetForm() {
    this.studentForm.reset();
  }
}
