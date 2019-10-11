import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Intrceptors implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const httpreq = req.clone({
      headers: req.headers.set("Content-Type", "application/json")

    });
    console.log(httpreq);
    return next.handle(httpreq);
  }

}
