import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cs: CookieService) { }

  public SetCookie(key: string, value: any): void {
    this.cs.set(key, value);
  }

  public GetCookie(key: string): string {
    return this.cs.get(key);
  }

  public DeleteCookies(key: string): void {
    this.cs.delete(key);
  }

  public FlushAll(): void {
    this.cs.deleteAll();
  }

}
