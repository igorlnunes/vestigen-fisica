import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-generator',
  templateUrl: './question-generator.component.html',
  styleUrls: ['./question-generator.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class QuestionGeneratorComponent {
  @Output() generateQuestion = new EventEmitter<{
    topico: string;
    dificuldade: string;
  }>();

  topics: string[] = [
    'Cinemática',
    'Dinâmica',
    'Energia',
    'Termodinâmica',
    'Óptica',
    'Eletrodinâmica',
  ];
  difficulties: string[] = ['Fácil', 'Intermediário', 'Difícil'];

  selectedTopic: string = this.topics[0];
  selectedDifficulty: string = this.difficulties[0];

  generate(): void {
    this.generateQuestion.emit({
      topico: this.selectedTopic,
      dificuldade: this.selectedDifficulty,
    });
  }
}