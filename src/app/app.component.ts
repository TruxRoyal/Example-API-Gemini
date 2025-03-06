import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageAnalysisComponent } from "./components/image-analysis/image-analysis.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageAnalysisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'google-ai-image-analysis';
}
