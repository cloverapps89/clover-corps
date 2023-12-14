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

          //removes items from the list by 10.
          this.triviaData = data.splice(0,10);
          this.getNextQuestion();
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  addCoins() {
this.triviaService.addCoins().subscribe({

  
})
  }

  reloadTrivia() {
    window.location.href = '/trivia';
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
     
      this.questionNumber++;
      
      if (this.answer.is_correct) {
        this.correctAnswers++;
      }
    } 
    
    console.log("Here is our starting Q #...<" + this.questionNumber + ">");
    this.answer = null;
    this.disableRadioButtons = false;
    this.disableNextButton = true;   
    
    if(this.total === 0){
    this.correctAnswers = this.correctAnswers / this.questionNumber;
    console.log("Your final score in % = " + this.correctAnswers);
    }
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
