import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private defaultHeaders: HttpHeaders;
  private subject = new BehaviorSubject<any>(undefined);

  //private usersUrl = 'api/users';  // URL to web api
  private baseUrl = 'localhost:8999';
  private serverUrl = 'http://' + this.baseUrl; // URL to server

  private webSocket = new WebSocket('ws://' + this.baseUrl);

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.defaultHeaders = new HttpHeaders().set(
      `Content-Type`,
      `application/json`
    );

    this.webSocket.onmessage = (event) => this.handleMessage(event);

    this.subject.subscribe((data) => {
      console.log(data);
    });
  }

  public getSubject(): BehaviorSubject<any> {
    return this.subject;
  }

  /** GET data from the server
   *
   * @param route The route to the Data.
   * The Data received through route will be assumed to have the form [K, V][]
   */
  public getMap<K, V>(route: string): Observable<Map<K, V>> {
    const url = this.serverUrl + route;

    return this.http
      .get<[K, V][]>(url, {
        responseType: `json`,
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'body',
      })
      .pipe(
        map((item) => new Map(item)),
        tap((_) => this.log('fetched data')),
        catchError(this.handleError<Map<K, V>>('get'))
      );
  }

  public add(route: string, info: object): void {
    const url = this.serverUrl + route;

    const myPost = this.http
      .post<string>(url, JSON.stringify(info), {
        responseType: 'json',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'body',
      })
      .pipe(catchError(this.handleError<string>(`add`)))
      .subscribe();
  }

  public change(route: string, info: object): void {
    const url = this.serverUrl + route;

    const myPut = this.http
      .put<string>(url, JSON.stringify(info), {
        responseType: 'json',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'body',
      })
      .pipe(catchError(this.handleError<string>(`change`)))
      .subscribe();
  }

  public delete(route: string, info: object): void {
    const url = this.serverUrl + route;

    const myDelete = this.http
      .delete<string>(url, {
        responseType: 'json',
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'body',
        body: JSON.stringify(info),
      })
      .pipe(catchError(this.handleError<string>(`delete`)))
      .subscribe();
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ClientService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private handleMessage(event: MessageEvent) {
    //var text = '';
    var msg = JSON.parse(event.data);
    //var time = new Date(msg.date);
    //var timeStr = time.toLocaleTimeString();

    this.subject.next(msg);
  }
}
