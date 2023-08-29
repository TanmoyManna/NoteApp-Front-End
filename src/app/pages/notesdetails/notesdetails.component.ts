import { ApiService } from '@project/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development'

@Component({
  selector: 'app-notesdetails',
  templateUrl: './notesdetails.component.html',
  styleUrls: ['./notesdetails.component.scss']
})
export class NotesdetailsComponent implements OnInit {
  imageBaseURL = environment.BASE_IMAGE_ENDPOINT
  noteDetail: any = {};

  constructor(private route: ActivatedRoute,
    private api: ApiService,) {
    this.route.params.subscribe((resp: any) => {
      this.getNoteDetail(resp.noteId);
    });
  }

  ngOnInit() {
  }

  getNoteDetail(noteId: string) {
    this.api.get(`notes/${noteId}`).subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          console.log(res);
          this.api.alert(res.message, 'success');
          this.noteDetail = res.data;          
        }
      },
      error: (err: any) => {
        this.api.alert(err.message ? err.message : "Internal Server Error", "error")
      }
    });
  }
}

