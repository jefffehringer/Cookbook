import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpService<T> {
  constructor(private http: HttpClient) {}

  getAll(url: string) {
    return this.http.get<T[]>(url).pipe(retry(2), take(1));
  }

  get(url: string) {
    return this.http.get<T>(url).pipe(retry(2), take(1));
  }

  delete(url: string) {
    return this.http.delete<T>(url).pipe(retry(2), take(1));
  }

  post(url: string, val: Partial<T>) {
    return this.http.post<T>(url, val).pipe(retry(2), take(1));
  }

  put(url: string, val: T) {
    return this.http.put<T>(url, val).pipe(retry(2), take(1));
  }
}
