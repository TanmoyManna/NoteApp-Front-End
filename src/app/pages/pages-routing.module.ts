import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesdetailsComponent } from './notesdetails/notesdetails.component';
import { NotesaddComponent } from './notesadd/notesadd.component';
import { NotesupdateComponent } from './notesupdate/notesupdate.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: NotesListComponent
      },
      {
        path: 'add',
        component: NotesaddComponent
      },
      {
        path: 'edit/:noteId',
        component: NotesupdateComponent
      },
      {
        path: 'details/:noteId',
        component: NotesdetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
