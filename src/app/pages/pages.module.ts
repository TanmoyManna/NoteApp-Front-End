import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesdetailsComponent } from './notesdetails/notesdetails.component';
import { NotesaddComponent } from './notesadd/notesadd.component';
import { NotesupdateComponent } from './notesupdate/notesupdate.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    PagesComponent,
    NotesListComponent,
    NotesdetailsComponent,
    NotesaddComponent,
    NotesupdateComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class PagesModule { }
