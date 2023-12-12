import { Routes } from '@angular/router';
import { TriviaComponent  } from './trivia/trivia.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent,
    },
    
    { 
        path: 'trivia', component: TriviaComponent, 
    },
];
