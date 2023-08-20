import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { HeaderComponent } from './shared/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserService} from "./services/user-service";
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'', component: RegisterComponent},
   {path:'home', component: HomeComponent, children:[
      {path:'note', component: NoteComponent}
    ]},
  {path:'login', component: LoginComponent},
  // {path: 'note', component: NoteComponent},
  // {path:'**', component: PageNotFoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NoteComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
