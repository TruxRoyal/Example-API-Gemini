import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAiService } from '../../services/google-ai.service';


@Component({
  selector: 'app-image-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-analysis.component.html',
  styleUrl: './image-analysis.component.css'
})
export class ImageAnalysisComponent {
  imageSrc: string | ArrayBuffer | null = null;
  analysisResult: string | null = null;
  isLoading: boolean = false;

  constructor(private googleAiService: GoogleAiService) {}

  onFileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = async () => {
        this.imageSrc = reader.result;
        this.isLoading = true;
        
        const base64Image = (reader.result as string).split(',')[1];
        this.analysisResult = await this.googleAiService.analyzeImage(base64Image);
        
        this.isLoading = false;
      };
      reader.readAsDataURL(file);
    }
  }
}
