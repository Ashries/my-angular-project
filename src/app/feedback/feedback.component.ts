import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService, Question } from '../services/questions.service'; // ← CORRECT IMPORT

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  questions: Question[] = [];
  answers: { [key: number]: string } = {};
  submitted = false;

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    // Get questions from the service
    this.questions = this.questionsService.getQuestions();
    
    // Initialize answers object
    this.questions.forEach(question => {
      this.answers[question.id] = '';
    });
  }

  onSubmit(): void {
    // Check if all required questions are answered
    const unansweredRequiredQuestions = this.questions.filter(
      question => question.required && !this.answers[question.id]
    );

    if (unansweredRequiredQuestions.length > 0) {
      alert('Vastaa kaikkiin pakollisiin kysymyksiin!');
      return;
    }

    this.submitted = true;
    
    // Here you would typically send the data to a backend
    console.log('Feedback answers:', this.answers);
    
    // Show success message
    alert('Kiitos palautteestasi!');
  }

  onReset(): void {
    this.questions.forEach(question => {
      this.answers[question.id] = '';
    });
    this.submitted = false;
  }

  isFormValid(): boolean {
    return this.questions.every(question => 
      !question.required || this.answers[question.id]
    );
  }

  getAnswerText(questionId: number): string {
    const answer = this.answers[questionId];
    if (!answer) return 'Ei vastausta';
    
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      // Find the option text for the selected value
      const option = question.options.find(opt => opt === answer);
      return option || answer;
    }
    return answer;
  }
}