import { ApiService } from '@project/services/api.service';
import { StorageService } from '@project/services/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  noteList: any[] = [];

  displayedColumns: string[] = ['Title', 'Content', 'CreatedAt', 'Action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userData: any;

  constructor(private api: ApiService,
    private storage: StorageService,
    private router: Router,) {
    this.userData = this.storage.getUser()
   }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.api.get('notes').subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          console.log(res);
          this.api.alert(res.message, 'success');
          this.noteList = res.data;
          this.dataSource = new MatTableDataSource(this.noteList);
          this.dataSource.paginator = this.paginator;
          
        }
      },
      error: (err: any) => {
        this.api.alert(err.message ? err.message : "Internal Server Error", "error")
      }
    });
  }

  goToDetails(item: any){
    this.router.navigate(['/details',item._id]);
  }
  goToEdit(item: any){
    this.router.navigate(['/edit',item._id]);
  }
  deleteNotes(item: any){
    this.api.delete(`notes/${item._id}`).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 200) {
          this.api.alert(res.message, 'success');
          this.getNotes();          
        }
      },
      error: (err: any) => {
        this.api.alert(err.message ? err.message : "Internal Server Error", "error")
      }
    });
  }
}
