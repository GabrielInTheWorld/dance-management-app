import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { Title } from '@angular/platform-browser';

import { Title, User } from '../fluff/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: BehaviorSubject<Map<number, User>> = new BehaviorSubject(new Map());


  constructor(
    private userService: UserService,
    ) { }

  public ngOnInit(): void {
    this.userService.getSubject().subscribe(users => {
      console.log(users)
      this.users.next(users)})
  }

  // getUsers(): void {
  //   this.userService.getUsers()
  //     .subscribe(users => this.users = users);
  // }

}
