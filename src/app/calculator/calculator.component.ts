import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, MatCardModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  display: string = '0';
  lastOperator: boolean = false;

  // Laskimen napit
  buttons: string[] = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '=', '+'
  ];

  // Napin painalluksen käsittely
  handleButtonClick(button: string): void {
    if (button === 'C') {
      // Tyhjennä näyttö
      this.display = '0';
      this.lastOperator = false;
    } else if (button === '=') {
      // Laske tulos
      try {
        // Korvaa näyttömuotoilu ennen laskemista
        const expression = this.display.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        this.display = result.toString();
        this.lastOperator = false;
      } catch (error) {
        this.display = 'Error';
        this.lastOperator = false;
      }
    } else if (['+', '-', '*', '/'].includes(button)) {
      // Operaattori - estä peräkkäiset operaattorit
      if (!this.lastOperator) {
        // Korvaa näyttömuotoilu
        const displayChar = button === '*' ? '×' : button === '/' ? '÷' : button;
        this.display += displayChar;
        this.lastOperator = true;
      }
    } else {
      // Numero
      if (this.display === '0' || this.display === 'Error') {
        this.display = button;
      } else {
        this.display += button;
      }
      this.lastOperator = false;
    }
  }

  // Tarkista onko nappi operaattori
  isOperator(button: string): boolean {
    return ['+', '-', '*', '/', '='].includes(button);
  }

  // Tarkista onko nappi erikoistoiminto
  isSpecial(button: string): boolean {
    return button === 'C' || button === '=';
  }
}