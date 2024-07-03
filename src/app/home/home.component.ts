import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NotesService} from "../services/notes-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnChanges, OnDestroy{
  hideSideNav = false;
  title = 'Note App';

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.showHideSubscription.subscribe(() => {
      this.hideSideNav = !this.hideSideNav;
    });

    console.log("ngOnInit")
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes + 'ngOnChange')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }



}
