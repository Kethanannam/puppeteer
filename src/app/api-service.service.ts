import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl1 = 'https://localhost:7020/api/HtmlContent/save'; // ✅ Base API URL
  private baseUrl2='https://localhost:7020/api/HtmlContent/get-all';
  private baseUrl3='https://localhost:7020/api/Puppeteer/generate';
                    

  constructor(private http: HttpClient) {}


  /** ✅ Generate PDF from HTML content */
  generatePdf(htmlContent: string): Observable<Blob> {
    return this.http.post(`${this.baseUrl3}`, 
      { htmlContent }, 
      { responseType: 'blob' } // Important for handling PDF files
    );
  }
}
