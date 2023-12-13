import { Routes } from '@angular/router';
import { TriviaComponent  } from './trivia/trivia.component';
// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EnlistComponent } from './enlist/enlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent,
    },
    
    { 
        path: 'trivia', component: TriviaComponent, 
    },

    { 
        path: 'enlist', component: EnlistComponent, 
    },

    { 
        path: 'dash', component: DashboardComponent, 
    },
];
