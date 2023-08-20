import { Component } from '@angular/core';
import {Note} from "./note.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  constructor(    private formBuilder: FormBuilder,
                  private router: Router,) {
  }
  noteForm : FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    username: ['', Validators.required],
  });
  addNewNote(note:Note){

  }


}
