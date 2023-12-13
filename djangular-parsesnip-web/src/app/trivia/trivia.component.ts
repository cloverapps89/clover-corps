import { Component, OnInit } from '@angular/core';
import { TriviaService } from "../trivia.service";
import { Answer, Question, QuestionArray } from "../trivia";
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
  standalone: true,
  imports: [CommonModule,
            FormsModule,MatRadioModule, MatButtonModule],
            
})
export class TriviaComponent implements OnInit {

  triviaData: QuestionArray = [];
  question: Question|null = null;
  answer: Answer|null = null;

  questionNumber: number = 0;
  correctAnswers: number = 0;
  total: number = 0;

 

  disableRadioButtons: boolean = false;
  disableNextButton: boolean = true;
   
  constructor(private triviaService: TriviaService) { }
  

  ngOnInit(): void {
    this.getTrivia();
  }

  getTrivia() {
    this.triviaService.getTrivia().subscribe({
        next: (data) => {
          console.log(data);
          this.triviaData = data;
          this.getNextQuestion();
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  getNextQuestion() {
    this.total = this.triviaData.length;
    console.log("Here is our total Q #...<" + this.total + ">");
    if (this.triviaData.length) {
      
      for(var i = 0; i < this.triviaData.length; i++) {
        this.triviaData[i].answers.sort(() => Math.random() - 0.5);
        }
      const index = Math.floor(Math.random() * this.triviaData.length);
      this.question = this.triviaData[index];
      this.triviaData.splice(index, 1);
      
      console.log("Here is the random answers...");
      console.log(this.triviaData);
    } else {
      this.question = null;
    }

    if (this.answer) {
     
      
      
      if (this.answer.is_correct) {
        this.correctAnswers++;
      }
    } 
    this.questionNumber++;
    console.log("Here is our starting Q #...<" + this.questionNumber + ">");
    this.answer = null;
    this.disableRadioButtons = false;
    this.disableNextButton = true;   
  }

  getCorrectAnswer() {
    if(this.question) {
      return this.question.answers.filter(answer => answer.is_correct)[0].answer;
    }
    return '';
  }

  answerSelected(event: MatRadioChange) {
    this.disableRadioButtons = true;
    this.disableNextButton = false;
  }
}
