import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @ViewChild('content', { static: false }) content!: ElementRef;

  personForm: FormGroup;
  submittedData: any = null;
  imagePreview: string | ArrayBuffer | null = null;
  maxDate: string = new Date().toISOString().split("T")[0]; // Restrict future years


  constructor(private fb: FormBuilder, private apiService: ApiServiceService) {
    this.personForm = this.fb.group({
      fullName: ['', ],
      email: ['', [, ]],
      phone: ['', [, Validators.pattern('^[0-9]{10}$')]], // Only 10 digits allowed
      linkedin: ['', ],
      profileImage: [null, ],
      careerObjective: ['', ],
      areasOfInterest: this.fb.array([this.fb.control('', )]),
      education: this.fb.array([this.createEducationGroup()])
    });
  }
  
  /* Create a new education form group with validations */
  createEducationGroup(): FormGroup {
    return this.fb.group({
      course: ['', ],
      collegeName: ['', ],
      universityName: ['', ],
      city: ['', ],
      country: ['', ],
      passoutMonth: ['', ],
      passoutYear: ['', [, Validators.pattern(/^\d{4}$/)]],
      scoreType: ['', ],
      score: [{ value: '', disabled: true }, [, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]]
    });
  }
 
  
  /**  Getters for Form Arrays */
  get areasOfInterest(): FormArray {
    return this.personForm.get('areasOfInterest') as FormArray;
  }

  get education(): FormArray {
    return this.personForm.get('education') as FormArray;
  }

  /**  Get Education FormGroup from FormArray */
  getEducationFormGroup(index: number): FormGroup {
    return this.education.at(index) as FormGroup;
  }

  /**  Handle CGPA/Percentage Selection */
  updateLabel(index: number, type: string) {
    const eduGroup = this.getEducationFormGroup(index);
    eduGroup.patchValue({ scoreType: type, score: '' });
    eduGroup.get('score')?.enable();
  }

  /**  Ensure user-entered marks are updated correctly */
  updateScore(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const enteredValue = inputElement.value;
    const eduGroup = this.getEducationFormGroup(index);

    eduGroup.patchValue({ score: enteredValue });
    console.log('Updated Form Value:', this.personForm.getRawValue());
  }

  /**  Handle file selection and preview */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.personForm.patchValue({ profileImage: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /**  Add / Remove Areas of Interest */
  addAreaOfInterest() {
    this.areasOfInterest.push(this.fb.control(''));
  }

  removeAreaOfInterest(index: number) {
    this.areasOfInterest.removeAt(index);
  }

  /**  Add / Remove Education */
  addEducation() {
    this.education.push(this.createEducationGroup());
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  /**  Submit Form */
  onSubmit() {
    if (this.personForm.valid) {
      this.submittedData = this.personForm.value;
      console.log('Form Submitted:', this.submittedData);
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  /**  Generate PDF */
  generatePdf() {
    if (this.content) {
      const htmlContent = this.content.nativeElement.innerHTML;
      this.apiService.generatePdf(htmlContent).subscribe(
        (response: Blob) => {
          const fileURL = URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = fileURL;
          a.download = 'generated.pdf';
          a.click();
          URL.revokeObjectURL(fileURL);
        },
        (error) => console.error('Error generating PDF:', error)
      );
    }
  }
}
