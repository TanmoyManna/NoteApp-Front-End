import { Component, OnInit } from '@angular/core';
import { ApiService } from '@project/services/api.service'
import { StorageService } from '@project/services/storage.service'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '@project/services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm: FormGroup = new FormGroup({});

  constructor(private api: ApiService,
    private router: Router,
    private storage: StorageService,
    private fb: FormBuilder,
    private event: EventService) { }

  ngOnInit(): void {
    this.formInit();
  }
  formInit(): void {
    this.LoginForm = this.fb.group({
      userName: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl()
    });
  }

  /*
  * LOGIN
  */
  login() {
    if(this.LoginForm.valid){
      const {userName,password } = this.LoginForm.value
      const data = {
        userName,
        password,
      }
      this.api.post('auth/signin', data).subscribe({
        next: (res: any)=>{
          console.log(res);
          if (res.status == 200) {
            let data = {
              token: res.data.accesstoken,
              id: res.data._id,
              email: res.data.email,
              userName: res.data.userName,
              userType: res.data.userType
            };
            this.storage.setUser(data);
            this.event.setLoginEmmit(true);
            this.router.navigate(['/home']);
            this.api.alert(res.message, 'success');
          } else {
            this.api.alert(res.message, "warning")
          }
        },
        error: (err:any)=>{
          this.api.alert(err.message, "error")
        }
      });
    }else{
      this.LoginForm.markAllAsTouched();
    }
    
  }
  /*
  * LOGIN
  */
}
