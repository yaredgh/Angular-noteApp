import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "./note.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotesService} from "../services/notes-service.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note:any;
  // currentDate: String;

  @Output('noteClicked') noteClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // this.currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');
  }

  noteClickHandler() {
    // this.note.selected = true;
    this.noteClicked.emit();
  }




}
