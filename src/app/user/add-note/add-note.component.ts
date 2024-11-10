import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notes } from 'src/app/model/Notes';
import { NotesService } from 'src/app/service/notes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.sass']
})
export class AddNoteComponent implements OnInit {
  addNotesForm!: FormGroup
  user!:any
  NotesObj:Notes=new Notes;
  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private notesService: NotesService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user=this.userService.getloginId()
    this.addNotesForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.maxLength(500), Validators.pattern(/^[a-zA-Z0-9@,.;&*+\-\s]*$/)]],
    })
  }

  addNotes() {
        if(this.addNotesForm.valid){
        this.NotesObj.userId=this.user
        this.NotesObj.body=this.addNotesForm.value.body
        this.NotesObj.title=this.addNotesForm.value.title
        this.notesService.saveNotes(this.NotesObj).subscribe({
          next: (val: any) => {
            this.router.navigate(["dashboard"]);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
  }

}

