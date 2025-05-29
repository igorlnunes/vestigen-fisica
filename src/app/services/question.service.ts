import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questao } from '../models/question.model';
import { environment } from '../../environments/environment';

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = environment.API_KEY;

if (!apiKey) {
  console.error(
    'A chave da API do Google Gemini não foi configurada no environment.'
  );
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }) : null; // Use 'gemini-pro' ou 'gemini-2.0-flash'

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {} 

  async generateQuestion(
    topico: string,
    dificuldade: string
  ): Promise<Questao | null> {
    if (!model) {
      console.error('Modelo Gemini não inicializado. Chave de API ausente.');
      return null;
    }

    const prompt = `
      Gere uma questão de física de nível ${dificuldade} sobre o tópico de ${topico} para estudantes do ensino médio.
      A questão deve ser no formato de múltipla escolha com exatamente 4 opções (A, B, C, D).
      Indique claramente a resposta correta ao final da geração.

      Formato de saída desejado:
      {
        "enunciado": "...",
        "opcoes": ["A) ...", "B) ...", "C) ...", "D) ..."],
        "respostaCorreta": "..."
      }
      `;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response?.text();
      if (responseText) {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        let jsonString = jsonMatch ? jsonMatch[1] : responseText;

        try {
          const questaoInfo: Questao = JSON.parse(jsonString.trim());
          return questaoInfo;
        } catch (e: any) {
          console.error('Erro ao decodificar JSON da resposta:', e);
          console.error('Resposta bruta do Gemini:', responseText);
          return null;
        }
      } else {
        console.error('Resposta do Gemini vazia.');
        return null;
      }
    } catch (e: any) {
      console.error('Erro ao gerar o enunciado, alternativas e resposta:', e);
      throw new Error(
        'Falha ao gerar questão. Verifique a chave da API ou o prompt.'
      );
    }
  }

  async generateResolution(
    enunciado: string,
    respostaCorreta: string
  ): Promise<string | null> {
    if (!model) {
      console.error('Modelo Gemini não inicializado. Chave de API ausente.');
      return null;
    }

    const prompt = `
      Gere uma resolução detalhada e passo a passo para a seguinte questão de física do ensino médio brasileiro.
      Organize a resolução em seções claras com títulos como: "1. Compreensão do Problema", "2. Identificação de Dados", "3. Fórmula Utilizada", "4. Passo a Passo da Solução", "5. Resposta Final".
      Seja conciso em cada seção, mas inclua todos os passos essenciais do raciocínio e utilize notação LaTeX para fórmulas e cálculos.

      Questão: ${enunciado}

      A resposta correta para esta questão é a opção ${respostaCorreta}.
      `;

    try {
      const result = await model.generateContent(prompt);
      const resolucao = result.response?.text();
      if (resolucao) {
        // Adaptação para LaTeX no formato web (pode precisar de uma biblioteca de renderização LaTeX no frontend)
        return resolucao
          .replace(/\\\(/g, '$')
          .replace(/\\\)/g, '$')
          .replace(/\\\[/g, '$$')
          .replace(/\\\]/g, '$$');
      } else {
        console.error('Resposta do Gemini para a resolução vazia.');
        return null;
      }
    } catch (e: any) {
      console.error('Erro ao gerar a resolução:', e);
      throw new Error('Falha ao gerar resolução. Tente novamente.');
    }
  }
}