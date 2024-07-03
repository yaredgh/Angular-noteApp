import { Component } from '@angular/core';
import {User} from "../../user.model";
import {AuthServiceService} from "../../services/auth-service.service";
import {NotesService} from "../../services/notes-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authServiceService:AuthServiceService, private notesService:NotesService) {
  }

  logOff(){
    this.authServiceService.doLogout();
  }

  selectedNote = false;
  disableEditing = false;
  ngOnInit() {
    this.notesService.noteClickSubscription.subscribe((data) => {
      this.selectedNote = true;
    });
  }

  addEditNoteHandler() {
    this.notesService.noteAddEditHandler();
    this.selectedNote = true;
  }

  deleteNoteHandler() {
    this.notesService.noteDeleteHandler();
    this.selectedNote = false;
  }

  toggleHandler() {
    this.notesService.noteToggleHandler(true);
  }

  searchHandler(inputEl:any) {
    this.notesService.searchHandler(inputEl.value);
  }

  disableEditingHandler(){
    this.disableEditing = !this.disableEditing;
    this.notesService.disableEditingSubscription.next({'disableEditing': this.disableEditing});
  }



}
