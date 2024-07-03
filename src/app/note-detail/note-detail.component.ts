import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotesService} from "../services/notes-service.service";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit{

  notesList:any[] = [];

  filteredNotes:any[] = [];
  selectedNote = null;

  searchedText = '';

  constructor(private notesService: NotesService) {
    // this.setDummyNote();
  }

  ngOnInit() {
    this.notesList = JSON.parse(localStorage.getItem('notes')|| '{}');
    this.filteredNotes = this.notesList;
    this.notesService.noteSearchSubscription.subscribe((value) => {
      // this.filteredNotes = this.searchedNotes(value);
    });
    this.notesService.noteDetailSubscription.subscribe((data: any) => {
      if ( data.note ) {
        const noteIndex = this.notesList.findIndex(note => note.id === data.note.id);
        this.notesList[noteIndex].body = data.value.body;
        this.notesList[noteIndex].title = data.value.title;
      } else {
        this.notesList[0].body = data.value.body;
        this.notesList[0].title = data.value.title;
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      if ( data.action === 'delete' && this.selectedNote ) {
        this.notesList.splice(this.getSelectedNoteIndex(), 1);
        if(this.notesList.length === 0){
          // this.setDummyNote();
        }
      }
      if ( data.action === 'addEdit' ) {
        let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');

        this.notesList.forEach(note => note.selected = false);
        this.notesList.unshift({
          id: Math.random() * 100,
          body: '',
          title: '',
          date: currentDate,
          selected: true
        });
        this.noteClickHandler(this.notesList[0]);
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });
  }

  setDummyNote() {
    let notes = JSON.parse(localStorage.getItem('notes')|| '{}');
    if( !notes || notes && notes.length === 0 ){
      let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');
      const newNote = {
        id: Math.random() * 100,
        body: '',
        title: '',
        date: currentDate,
        selected: true
      };
      localStorage.setItem('notes', JSON.stringify([newNote]));
      this.notesList = JSON.parse(localStorage.getItem('notes')|| '{}');
      this.notesService.noteClickSubscription.next(newNote);
    }
  }

  addNoteHandler(){
    this.setDummyNote();
  }

  getSelectedNoteIndex() {
    const index = this.notesList.findIndex( note => note.selected === true );
    this.selectedNote = this.notesList[index];
    return index;
  }

  removeSelection() {
    this.notesList.forEach(note => note.selected = false);
  }

  noteClickHandler(data:any) {
    const index = this.notesList.findIndex( note => note.id === data.id );
    this.selectedNote = this.notesList[index];
    this.notesList.forEach(note => note.selected = false);
    this.notesList[index].selected = true;
    this.notesService.noteClickSubscription.next(this.notesList[index]);
  }

  searchedNotes(value?:string){
    if( value || (typeof value === 'string' && value.length === 0) ){
      this.searchedText = value;
    }
    if( this.notesList && this.notesList.length > 0 ){
      return this.notesList.filter((note) => {
        if( this.searchedText.trim().length === 0 ||
          note.title.indexOf(this.searchedText.trim()) > -1 ||
          note.body.indexOf(this.searchedText.trim()) > -1 ){
          return true;
        } else {
          return false;
        }
      });
    } else {
      return [];
    }

  }

}
