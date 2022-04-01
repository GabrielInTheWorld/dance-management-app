import { Injectable } from '@angular/core';
import { User, SimpleUser, IdentifiedUser, isUser } from './fluff/user';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new BehaviorSubject<Map<number, User>>(new Map([]));

  constructor(
    private messageService: MessageService,
    private clientService: ClientService
  ) {
    this.clientService
      .getSubject()
      .subscribe((data) => this.handleMessage(data));

    clientService
      .getMap<number, User>('/getAllData')
      .subscribe((users) => this.subject.next(users));
    this.subject.subscribe((users) => {
      console.log(users);
    });
  }

  public getSubject(): BehaviorSubject<Map<number, User>> {
    return this.subject;
  }

  /** GET user by id. TODO: Look at error handling */
  public getUser(
    id: number
  ): BehaviorSubject<{ key: number; value: User } | undefined> {
    const data = new BehaviorSubject<{ key: number; value: User } | undefined>(
      undefined
    );
    this.subject.subscribe((users) => {
      if (typeof users.get(id) === 'undefined') {
        data.next(undefined);
      } else {
        data.next({ key: id, value: users.get(id)! });
      }
    });
    return data;
  }

  public addUser(info: SimpleUser): void {
    this.clientService.add('/addUser', info);
  }

  public changeUser(info: IdentifiedUser): void {
    this.clientService.change('/changeUser', info);
  }

  public deleteUser(id: number): void {
    this.clientService.delete('/deleteUser', { id: id });
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  private handleMessage(data: any) {
    //var timeStr = time.toLocaleTimeString();

    if (typeof data === 'object') {
      //TODO: Test if this actually holds [number, User]-pairs
      if (
        Array.isArray(data) &&
        (typeof data[0] === 'undefined' || Array.isArray(data[0]))
      ) {
        this.log(`Received data from server`);
        console.log(data, this.subject);
        this.subject.next(new Map<number, User>(data));
      } else {
        this.log(`Received WRONG data from Server`);
      }
    }
  }
}
