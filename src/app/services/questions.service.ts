import { Injectable } from '@angular/core';

export interface Question {
  id: number;
  text: string;
  options: string[];
  required: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questions: Question[] = [
    {
      id: 1,
      text: 'Miten arvioisit sovelluksen helppokäyttöisyyttä?',
      options: ['Huono', 'OK', 'Hyvä', 'Erinomainen'],
      required: true
    },
    {
      id: 2,
      text: 'Kuinka visuaalisesti miellyttäväksi arvioisit sovelluksen?',
      options: ['Huono', 'OK', 'Hyvä', 'Erinomainen'],
      required: true
    },
    {
      id: 3,
      text: 'Kuinka hyvin sovellus vastasi tarpeisiisi?',
      options: ['Huono', 'OK', 'Hyvä', 'Erinomainen'],
      required: true
    },
    {
      id: 4,
      text: 'Kuinka todennäköisesti suosittelisit sovellusta toisille?',
      options: ['En suosittele', 'Ehkä suosittelisin', 'Todennäköisesti suosittelisin', 'Varmasti suosittelisin'],
      required: false
    },
    {
      id: 5,
      text: 'Miten arvioisit sovelluksen nopeutta ja suorituskykyä?',
      options: ['Hidas', 'OK', 'Nopea', 'Erittäin nopea'],
      required: true
    }
  ];

  constructor() { }

  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestionById(id: number): Question | undefined {
    return this.questions.find(question => question.id === id);
  }

  addQuestion(question: Question): void {
    this.questions.push(question);
  }

  getQuestionsCount(): number {
    return this.questions.length;
  }
}