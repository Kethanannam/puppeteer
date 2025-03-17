import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
declare var bootstrap: any;


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component {

  

  personForm: FormGroup;
  submittedData: any = null;
  imagePreview: string | ArrayBuffer | null = null;
  maxDate: string = new Date().toISOString().split("T")[0]; // Restrict future years
  jsonData:any

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
      passoutYear: ['', [Validators.pattern(/^\d{4}$/)]],
      scoreType: ['', ],
      score: [{ value: '', disabled: true }, [, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]]
    });
  }
 
  
  /**  Getters for Form Arrays */
  get areasOfInterest(): FormArray {
    return this.personForm.get('areasOfInterest') as FormArray;
  }
  get leftColumnInterests(): string[] {
    return this.submittedData?.areasOfInterest
      ? this.submittedData.areasOfInterest.slice(0, Math.ceil(this.submittedData.areasOfInterest.length / 2))
      : [];
  }

  get rightColumnInterests(): string[] {
    return this.submittedData?.areasOfInterest
      ? this.submittedData.areasOfInterest.slice(Math.ceil(this.submittedData.areasOfInterest.length / 2))
      : [];

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
 

  /** Fetch Data and Populate Form */
  onFetchData() {
    this.jsonData = {
      "fullName": "ABHINANDANA RAMKUMARR DEVANAHALLI",
      "email": "abhinandana.dev@example.com",
      "phone": "7829011149",
      "linkedin": "https://www.linkedin.com/in/abhinandana-devanahalli",
      "profileImage":'https://images.pexels.com/photos/1288182/pexels-photo-1288182.jpeg?cs=srgb&dl=pexels-juanlaurio-1288182.jpg&fm=jpg',
      "careerObjective": "To work in an organization that provides me with challenging opportunities to gain knowledge and enhance my expertise by contributing to the growth of the organization. Looking forward to opportunities to learn and play a pivotal role in the company’s growth to help realize my potential.",
      "areasOfInterest": [
        "Electric two-wheeler vehicles",
        "Machine design with AutoCAD",
        "Biofuel generation plants",
        "Calibration of fluid pumps",
        "Machine learning with Python",
        "Smart city development",
        "Data analytics and visualization"
      ],
      "education": [
        {
          "course": "Master of Computer Applications (MCA)",
          "passoutMonth": "Feb",
          "passoutYear": 2029,
          "score": 8.00,
          "scoreType": "CGPA",
          "collegeName": "Bapuji Institute of Engineering and Technology, Davangere",
          "universityName": "Visvesvaraya Technological University",
          "city": "Davangere",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },      
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },    
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        },
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }, 
        {
          "course": "Bachelor of Engineering (Civil Engineering)",
          "passoutMonth": "Oct",
          "passoutYear": 2024,
          "score": 78.00,
          "scoreType": "Percentage",
          "collegeName": "Jawaharlal Nehru National College of Engineering, Shivamogga",
          "universityName": "Visvesvaraya Technological University",
          "city": "Shivamogga",
          "country": "India"
        }
        
      ]
    };
  
    
    // Patch basic details
    this.personForm.patchValue({
      fullName: this.jsonData.fullName,
      email: this.jsonData.email,
      phone: this.jsonData.phone,
      linkedin: this.jsonData.linkedin,
      profileImage:this.jsonData.profileImage,
      careerObjective: this.jsonData.careerObjective
    });
  
    this.areasOfInterest.clear(); // Clear the previous controls
    this.jsonData.areasOfInterest.forEach((interest: any) => {
      this.areasOfInterest.push(this.fb.control(interest, Validators.required));
    });
    // Update Education Details
    this.education.clear(); // Clear existing controls
    this.jsonData.education.forEach((edu : any) => {
      const eduGroup = this.fb.group({
        course: [edu.course, Validators.required],
        passoutMonth: [edu.passoutMonth, Validators.required],
        passoutYear: [edu.passoutYear, [Validators.required, Validators.pattern(/^\d{4}$/)]],
        score: [edu.score, [Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
        scoreType: [edu.scoreType, Validators.required],
        collegeName: [edu.collegeName, Validators.required],
        universityName: [edu.universityName, Validators.required],
        city: [edu.city, Validators.required],
        country: [edu.country, Validators.required]
      });
      this.education.push(eduGroup);
    });
  
    console.log("Form Updated with JSON Data", this.personForm.value);
  }


  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
  
    if (this.personForm.valid) {
      this.submittedData = this.personForm.value;
      console.log("Form Submitted:", this.submittedData);
  
      // ✅ Ensure JSON data is populated first
      this.onFetchData(); 
  
      // ✅ Delay the PDF generation slightly to ensure `submittedData` updates
      setTimeout(() => {
        this.generatePdf()
          .then(() => {
            let modal = new bootstrap.Modal(document.getElementById("pdfModal")!);
            modal.show();
          })
          .catch((error) => {
            console.error("PDF Generation Failed:", error);
          });
      }, 200); // ✅ Small delay ensures data is fully set before generating PDF
    } else {
      alert("Please fill all required fields correctly.");
    }
  }

  
  
  generatePdf(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Using document.getElementById() to get the content with id "content"
      const contentElement = document.getElementById('content');
      
      if (contentElement) {
        const htmlContent = contentElement.innerHTML;
  
        this.apiService.generatePdf(htmlContent).subscribe(
          (response: Blob) => {
            const pdfBlobUrl = URL.createObjectURL(response);
  
            // ✅ Directly update iframe without delay
            const pdfIframe = document.getElementById('pdfPreview') as HTMLIFrameElement;
            if (pdfIframe) {
              pdfIframe.src = pdfBlobUrl;
            }
  
            resolve(); // ✅ Success
          },
          (error) => {
            console.error('Error generating PDF:', error);
            reject(error); // ✅ Failure
          }
        );
      } else {
        reject("No content found");
      }
    });
  }
  
  
  
}
