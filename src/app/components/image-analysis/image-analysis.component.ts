import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAiService } from '../../services/google-ai.service';

interface AnalyzedImage {
  src: string | ArrayBuffer | null;
  result: string | null;
}

@Component({
  selector: 'app-image-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-analysis.component.html',
  styleUrl: './image-analysis.component.css'
})
export class ImageAnalysisComponent {
  images: AnalyzedImage[] = [];
  isLoading: boolean = false;
  selectedModel: 'flash' | 'pro' = 'flash';

  constructor(private googleAiService: GoogleAiService) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    this.isLoading = true;

    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageSrc = reader.result;
        const base64Image = (reader.result as string).split(',')[1];

        this.images.push({ src: imageSrc, result: 'Analizando...' });

        const analysisResult = await this.googleAiService.analyzeImage(base64Image, this.selectedModel);

        const imageIndex = this.images.findIndex(img => img.src === imageSrc);
        if (imageIndex !== -1) {
          this.images[imageIndex].result = analysisResult;
        }

        this.isLoading = false;
      };
      reader.readAsDataURL(file);
    });
  }

  changeModel(event: Event) {
    const target = event.target as HTMLSelectElement; 
    this.selectedModel = target.value as 'flash' | 'pro';
  }
  
}
