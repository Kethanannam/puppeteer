import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
//   @ViewChild('content', { static: false }) content!: ElementRef;
//   savedHtmlContents: any[] = [];

//   constructor(private apiService: ApiServiceService) {}


//   /** ✅ Generate PDF */
//   generatePdf() {
//     if (this.content) {
//       const htmlContent = this.content.nativeElement.innerHTML;
//       this.apiService.generatePdf(htmlContent).subscribe(
//         (response: Blob) => {
//           const fileURL = URL.createObjectURL(response);
//           const a = document.createElement('a');
//           a.href = fileURL;
//           a.download = 'generated.pdf';
//           a.click();
//           URL.revokeObjectURL(fileURL);
//         },
//         (error) => console.error('Error generating PDF:', error)
//       );
//     }
//   }
}
