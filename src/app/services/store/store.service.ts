import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { StoreSettings } from './models/store-settings.model';

@Injectable({ providedIn: 'root' })
export abstract class StoreService<T> {
  //#region Subjects, Objservables, Getter/Setters
  private itemsSubject = new BehaviorSubject<T[]>([]);
  items$ = this.itemsSubject.asObservable();

  protected get items(): T[] {
    return this.itemsSubject.getValue();
  }
  protected set items(val: T[]) {
    this.itemsSubject.next(val ? [...val] : []);
  }

  private selectedSubject = new BehaviorSubject<T>(null);
  selected$ = this.selectedSubject.asObservable();

  protected get selected(): T {
    return this.selectedSubject.getValue();
  }
  protected set selected(val: T) {
    this.selectedSubject.next(val == null ? null : { ...val });
  }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  protected get loading(): boolean {
    return this.loadingSubject.getValue();
  }
  protected set loading(val: boolean) {
    this.loadingSubject.next(val);
  }

  private loadErrorSubject = new Subject<HttpErrorResponse>();
  loadError$ = this.loadErrorSubject.asObservable();

  protected set loadError(val: HttpErrorResponse) {
    this.loadErrorSubject.next(val);
  }

  private getErrorSubject = new Subject<HttpErrorResponse>();
  getError$ = this.getErrorSubject.asObservable();

  protected set getError(val: HttpErrorResponse) {
    this.getErrorSubject.next(val);
  }

  private deletingSubject = new BehaviorSubject<boolean>(false);
  deleting$ = this.deletingSubject.asObservable();

  protected get deleting(): boolean {
    return this.deletingSubject.getValue();
  }
  protected set deleting(val: boolean) {
    this.deletingSubject.next(val);
  }

  protected deleteSuccessSubject = new Subject<T>();
  deleteSuccess$ = this.deleteSuccessSubject.asObservable();

  protected updateSuccessSubject = new Subject<T>();
  updateSuccess$ = this.updateSuccessSubject.asObservable();

  protected createSuccessSubject = new Subject<T>();
  createSuccess$ = this.createSuccessSubject.asObservable();

  private noLoadResultsSubject = new Subject<void>();
  noLoadResults$ = this.noLoadResultsSubject.asObservable();
  //#endregion

  constructor(
    protected http: HttpClient,
    protected settings: StoreSettings
  ) {}

  load(filter = '', order = '', page = 0, pageSize = 0, useCache = false, append = false) {
    if (useCache && this.items?.length > 0) {
      return;
    }
    this.loading = true;
    let url = this.settings.url;
    url += this.buildUrl(filter, order, page, pageSize);

    this.http
      .get<T[]>(url)
      .pipe(
        catchError((e) => {
          this.loadError = e;
          return throwError(`Error loading ${this.settings.itemName}s`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        if (append) {
          this.items = this.items.concat(d);
        } else {
          this.items = d;
        }

        if (d.length === 0) {
          this.noLoadResultsSubject.next();
        }
      });
  }

  get(id: string | number) {
    if (id === null) {
      this.selected = null;
      return;
    }

    this.loading = true;
    this.selected = null;

    this.http
      .get<T>(`${this.settings.url}${id}`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error loading ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.selected = d;
      });
  }

  add(val: Partial<T>) {
    this.loading = true;

    this.http
      .post<T>(`${this.settings.url}`, val)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error creating ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.createSuccessSubject.next(d);
      });
  }

  update(val: T) {
    this.loading = true;
    const id = val[this.settings.idField];

    this.http
      .put<T>(`${this.settings.url}${id}`, val)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error updating ${this.settings.itemName}`);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((d) => {
        this.replaceOrAdd(d);
        this.updateSuccessSubject.next(d);
      });
  }

  delete(val: T) {
    this.deleting = true;
    const id = val[this.settings.idField];

    this.http
      .delete(`${this.settings.url}${id}`)
      .pipe(
        catchError((e) => {
          this.getError = e;
          return throwError(`Error deleting ${this.settings.itemName}`);
        }),
        finalize(() => (this.deleting = false))
      )
      .subscribe((d) => {
        this.remove(val);
        this.deleteSuccessSubject.next();
      });
  }

  select(val: T) {
    this.selected = val;
  }

  getCached(id: string | number): T {
    return this.items.find((i) => i[this.settings.idField] === id);
  }

  findCached(predicate: (item: T) => boolean): T {
    return this.items.find(i => predicate(i));
  }

  clearCached() {
    this.items = [];
  }

  protected remove(val: T) {
    this.items = this.items.filter(
      (i) => i[this.settings.idField] !== val[this.settings.idField]
    );
  }

  protected replaceOrAdd(item: T) {
    const existingIndex = this.items?.findIndex(
      (i) => i[this.settings.idField] === item[this.settings.idField]
    );

    if (existingIndex >= 0) {
      this.items[existingIndex] = item;
      this.items = this.items;
    } else {
      this.items.push(item);
      this.items = this.items;
      // this.items = this.items.pu [...this.items, item];
    }
  }

  protected buildUrl(filter = '', order = '', page = 0, pageSize = 0) {
    return `?filter=${filter}&order=${order}&page=${page}&pageSize=${pageSize}`;
  }
}
