import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  readonly url=`http://localhost:8095/notes/`;
  constructor(private http:HttpClient) {
   }
   public getNotesByUserId(userId:number):Observable<any> {
    return this.http.get(this.url+`user/`+userId);
  }
  public deleteNotes(id:any):Observable<any> {
    return this.http.delete(this.url+id);
  }
  public getNotes(id:any):Observable<any> {
    return this.http.get(this.url+id);
  }
  saveNotes(notes: any) {
    return this.http.post(this.url,notes);
  }
}
