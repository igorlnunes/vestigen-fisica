import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Questao } from '../../models/question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
  imports: [CommonModule]
})
export class QuestionDisplayComponent {
  @Input() question: Questao | null = null;
  @Output() answerSelected = new EventEmitter<string>();

  hasAnswered: boolean = false;

  onSelect(opcao: string): void {
    if (!this.hasAnswered) {
      this.hasAnswered = true;
      this.answerSelected.emit(opcao);
    }
  }
}