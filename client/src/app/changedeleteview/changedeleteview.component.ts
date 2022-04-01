import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { buildIdentifiedFromUser, Title, User, isUser } from '../fluff/user';
import { UserService } from '../user.service';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-changedeleteview',
  templateUrl: './changedeleteview.component.html',
  styleUrls: ['./changedeleteview.component.scss']
})
export class ChangedeleteviewComponent implements OnInit {

  public users: BehaviorSubject<Map<number, User>> = new BehaviorSubject(new Map());
  public titles: Title[] = [null, 'Prof.', 'Dr.']

  constructor(
    private userService: UserService,
    public messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.userService.getSubject().subscribe(users => {
      console.log(users)
      this.users.next(users)})
  }

  public submitChange(id: number): void{
    if(!isUser(this.users.value.get(id))) throw new Error("changeUser: NoData!");
    this.userService.changeUser(buildIdentifiedFromUser(id, this.users.value.get(id)!));
    this.messageService.add(`Change on id: ${id}`);
    this.messageService.add(`User ${id}: ${this.users.value.get(id)?.title} ${this.users.value.get(id)?.firstName} ${this.users.value.get(id)?.lastName}`);
  }

  public submitDelete(id: number): void{
    if(!isUser(this.users.value.get(id))) throw new Error("deleteUser: NoData!");
    this.userService.deleteUser(id);
    this.messageService.add(`Delete on id: ${id}`);
  }

}
