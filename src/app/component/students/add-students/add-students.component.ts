import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Fieldset } from 'primeng/fieldset';

@Component({
  selector: 'app-add-students',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    TextareaModule,
    ButtonModule,
    FileUploadModule,
    CheckboxModule,
    RadioButtonModule,
    Fieldset,
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
