import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service'
import { StorageService } from '@project/services/storage.service'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '@project/services/event.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  SignupForm: FormGroup = new FormGroup({});

  constructor(private api: ApiService,
    private router: Router,
    private storage: StorageService,
    private fb: FormBuilder,
    private event: EventService) { }

  ngOnInit(): void {
    this.formInit();
  }
  formInit(): void {
    this.SignupForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      userType: new FormControl('', [Validators.required]),
    });
  }


  signup() {
    if (this.SignupForm.valid) {
      const { userName, email, password } = this.SignupForm.value
      const data = { userName, email, password }
      this.api.post('auth/signup', data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this.api.alert(res.message, 'success');
            this.router.navigate(['/login']);
          } else {
            this.api.alert(res.message, "warning")
          }
        },
        error: (err: any) => {
          this.api.alert(err.message, "error")
        }
      })
    } else {
      this.SignupForm.markAllAsTouched();
    }
  }
}
