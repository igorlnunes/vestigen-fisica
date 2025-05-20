import { Component } from '@angular/core';
import { QuestionService } from './services/question.service';
import { Questao } from './models/question.model';
import { HeaderComponent } from './components/header/header.component';
import { ResolutionDisplayComponent } from './components/resolution-display/resolution-display.component';
import { QuestionDisplayComponent } from './components/question-display/question-display.component';
import { QuestionGeneratorComponent } from './components/question-generator/question-generator.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, ResolutionDisplayComponent, QuestionDisplayComponent, QuestionGeneratorComponent, CommonModule]
})
export class AppComponent {
  currentQuestion: Questao | null = null;
  currentResolution: string | null = null;
  selectedAnswer: string | null = null;
  isAnswerCorrect: boolean = false;
  showFeedback: boolean = false;
  feedbackMessage: string = '';
  displayResolution: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private questionService: QuestionService) {}

  async onGenerateQuestion(event: {
    topico: string;
    dificuldade: string;
  }): Promise<void> {
    this.resetState();
    this.isLoading = true;
    try {
      const question = await this.questionService.generateQuestion(
        event.topico,
        event.dificuldade
      );
      if (question) {
        this.currentQuestion = question;
      } else {
        this.errorMessage =
          'Não foi possível gerar a questão. Tente novamente.';
      }
    } catch (error) {
      console.error('Erro ao gerar questão:', error);
      this.errorMessage =
        'Ocorreu um erro ao gerar a questão. Verifique sua conexão ou tente mais tarde.';
    } finally {
      this.isLoading = false;
    }
  }

  onAnswerSelected(answer: string): void {
    if (!this.currentQuestion) return;

    this.selectedAnswer = answer;
    this.isAnswerCorrect = answer === this.currentQuestion.respostaCorreta;
    this.feedbackMessage = this.isAnswerCorrect
      ? 'Parabéns! Resposta correta!'
      : `Que pena! A resposta correta era: ${this.currentQuestion.respostaCorreta}`;
    this.showFeedback = true;
  }

  async showResolution(): Promise<void> {
    if (!this.currentQuestion) return;

    this.isLoading = true;
    try {
      const resolution = await this.questionService.generateResolution(
        this.currentQuestion.enunciado,
        this.currentQuestion.respostaCorreta
      );
      if (resolution) {
        this.currentResolution = resolution;
        this.displayResolution = true;
      } else {
        this.errorMessage = 'Não foi possível gerar a resolução.';
      }
    } catch (error) {
      console.error('Erro ao gerar resolução:', error);
      this.errorMessage =
        'Ocorreu um erro ao gerar a resolução. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  resetQuestion(): void {
    this.resetState();
    this.currentQuestion = null; // Volta para a tela de seleção de tópico/dificuldade
  }

  private resetState(): void {
    this.currentQuestion = null;
    this.currentResolution = null;
    this.selectedAnswer = null;
    this.isAnswerCorrect = false;
    this.showFeedback = false;
    this.feedbackMessage = '';
    this.displayResolution = false;
    this.errorMessage = '';
  }
}