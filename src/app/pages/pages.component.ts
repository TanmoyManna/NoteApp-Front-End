import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@project/services/api.service';
import { EventService } from '@project/services/event.service';
import { StorageService } from '@project/services/storage.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  constructor(private router: Router,
    private storage: StorageService,
    private api: ApiService,
    private event: EventService){}
  logout() {
    this.event.setLoginEmmit(false);
    this.api.alert('Logout Successfully', 'success');
    this.storage.clearUser();
    this.router.navigate(['login']);
  }

}
