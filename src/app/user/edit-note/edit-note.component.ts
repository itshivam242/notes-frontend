import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notes } from 'src/app/model/Notes';
import { NotesService } from 'src/app/service/notes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.sass']
})
export class EditNoteComponent implements OnInit {
  editNotesForm!: FormGroup
  user!: any
  noteId!: any
  NotesObj: Notes = new Notes;
  noteData: any;
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notesService: NotesService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.noteId = this.activatedRoute.snapshot.paramMap.get("id")

    this.user = this.userService.getloginId()
    this.editNotesForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.maxLength(500), Validators.pattern(/^[a-zA-Z0-9@,.;&*+\-\s]*$/)]],
    })

    this.notesService.getNotes(this.noteId).subscribe(res => {
      this.noteData = res;
      console.log(this.noteData)
      this.editNotesForm.patchValue({
        title: this.noteData?.title || '',
        body: this.noteData?.body || '',
      });
    }
    )
  }

  editNotes() {
    if (this.editNotesForm.valid) {
      this.NotesObj.userId = this.user
      this.NotesObj.id = this.noteId
      console.log(this.NotesObj.id)
      this.NotesObj.body = this.editNotesForm.value.body
      this.NotesObj.title = this.editNotesForm.value.title
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
