import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private event: EventService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.event.isHttpRequest.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.event.isHttpRequest.next(true);
    return new Observable((observer: any) => {
      const subscription = next.handle(req).subscribe({
        next: event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        error: err => {
          this.removeRequest(req);
          observer.error(err);
        },
        complete: () => {
          this.removeRequest(req);
          observer.complete();
        }
      });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
