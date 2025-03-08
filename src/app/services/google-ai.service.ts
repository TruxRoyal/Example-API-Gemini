import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GoogleAiService {

  private genAI: GoogleGenerativeAI;

  constructor() { 
    this.genAI = new GoogleGenerativeAI(environment.googleApiKey);
  }

  async analyzeImage(base64Image: string, modeltype: 'flash' | 'pro' = 'flash') {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: modeltype === 'flash' ? 'gemini-1.5-flash' : 'gemini-1.5-pro',
      });

      const imageParts = [{ inlineData: {data: base64Image, mimeType: 'image/png'}}];
      const prompt = 'Describe esta imagen de manera detallada, la descripción debe ser siempre en español';

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error en el analisis de imagen: ',error);
      return 'No se pudo analizar la imagen';

    }
  }
}
