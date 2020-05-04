import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { StorageService } from './../Services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth')) {
            return next.handle(req.clone());
        } else {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.storage.GetCookie('token'))
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth === false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}
