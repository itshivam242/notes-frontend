import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from 'src/app/service/notes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  constructor( public notesService: NotesService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }
    userId: any;
    notes:any;
  ngOnInit(): void {
    
    if (this.userService.getloginId() != null) {
      this.userId = this.userService.getloginId();
    }
    this.getNotesOfUser();
    }

    getNotesOfUser(){
      this.notesService.getNotesByUserId(this.userId).subscribe((res:any) => {
        this.notes = res;
          })
        }
      
      editNote(noteId: number) {
        this.router.navigate(['/notes/edit', noteId]);
      }
    
      deleteNote(id: number){
        this.notesService.deleteNotes(id).subscribe(res=>{
          setTimeout(()=>{location.reload()},500)
        })
      }

      toggleButtons(note: any) {
        note.showButtons = !note.showButtons;
      }
}

