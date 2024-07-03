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
import { HomeComponent } from './home/home.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NotesService} from "./services/notes-service.service";
import {MatCardModule} from "@angular/material/card";


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
    HomeComponent,
    NoteDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
