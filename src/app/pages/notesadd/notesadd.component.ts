import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-notesadd',
  templateUrl: './notesadd.component.html',
  styleUrls: ['./notesadd.component.scss']
})
export class NotesaddComponent implements OnInit {
  noteForm: FormGroup = new FormGroup({});
  previewUploadedFiles: string = "";
  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.noteForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      fileAttachment: new FormControl(''),
    });
  }

  createNote() {
    let form = this.noteForm;
    this.BeforeSubmit(form).then((data: any) => {
      console.log(form);
      if (form.valid) {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append(`fileAttachment`, data.fileAttachment);

        this.api.postMultiDataWithToken('notes', formData).subscribe({
          next: (result: any) => {
            console.log('Submit Data', result);

            if (result.status === 200) {
              this.api.alert(result.massage, 'success');
              this.noteForm.reset();
              this.previewUploadedFiles = "";
            } else {
              this.api.alert(result.message, 'warning');
            }
          },
          error: (err) => {
            this.api.alert(err.message, 'error');
          }
        })
      } else {
        form.markAllAsTouched();
      }
    });
  }
  BeforeSubmit(form: FormGroup): Promise<void> {
    return new Promise((resolve) => {
      Object.keys(form.value).forEach((x) => {
        if (
          typeof form.controls[x].value === 'string' &&
          !isEmpty(form.controls[x].value)
        ) {
          form.controls[x].setValue(form.controls[x].value.trim());
        }
      });
      resolve(form.value);
    });
  }


  fileAdded(event: Event) {
    const inputValue = event.target as HTMLInputElement;
    console.log(inputValue.files);
    if (inputValue.files && inputValue.files.length > 0) {
      if (
        inputValue.files[0].type === 'image/jpeg' ||
        inputValue.files[0].type === 'image/png' ||
        inputValue.files[0].type === 'image/jpg' ||
        inputValue.files[0].type === 'application/pdf'
      ) {

        const fileSizeInMB = Math.round((inputValue.files[0].size / 1024) / 1024);
        if (fileSizeInMB > 10) {
          this.api.alert('Please upload files below 5 MB', 'warning');
          inputValue.value = ''
          return;
        }
        this.noteForm.patchValue({
          fileAttachment: <File>inputValue.files[0]
        });
        const reader = new FileReader();
        reader.readAsDataURL(inputValue.files[0]);
        console.log(inputValue.files[0]);
        reader.onload = () => {
          this.previewUploadedFiles = reader.result as string;
        };
      }
    } else {
      this.api.alert('Please upload images/pdf only', 'warning');
      inputValue.value = '';
    }
  }
  deleteFiles() {
    this.previewUploadedFiles = "";
    this.noteForm.patchValue({
      fileAttachment: ""
    })
  }

}
