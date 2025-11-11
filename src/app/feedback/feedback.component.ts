import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Question } from '../question';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatCardModule, MatListModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  questions: Question[] = [
    new Question(
      'Kysymys 1',
      ['Huono', 'OK', 'Hyvä']
    ),
    new Question(
      'Kysymys 2', 
      ['Huono', 'OK', 'Hyvä']
    ),
    new Question(
      'Kysymys 3',
      ['Huono', 'OK', 'Hyvä']
    )
  ];

  onSliderChange(question: Question, value: number): void {
    question.setFeedback(value);
  }

  getSliderValue(question: Question): number {
    const value = question.getFeedbackValue();
    return value === -1 ? 1 : value; // Oletusarvo "OK"
  }

  // LISÄÄ TÄMÄ METODI:
  formatLabel(value: number): string {
    return value.toString();
  }
}