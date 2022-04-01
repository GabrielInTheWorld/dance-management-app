import { Component, OnInit } from '@angular/core';

import { Title } from '../fluff/user';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-addview',
  templateUrl: './addview.component.html',
  styleUrls: ['./addview.component.scss']
})
export class AddviewComponent implements OnInit {
  public addForm: FormGroup;
  public titles: Title[] = [null, 'Prof.', 'Dr.']

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public messageService: MessageService
    ) {
      this.addForm = this.fb.group({
        title: null,
        firstName: "",
        lastName: "",
      });
    }

  public ngOnInit(): void {}

  public submitAdd(): void {
    this.userService.addUser(this.addForm.value);
    this.messageService.add("User added:");
    if(this.addForm.value.title==null){
      this.messageService.add(`${this.addForm.value.firstName} ${this.addForm.value.lastName}`);
    }
    else{
      this.messageService.add(`${this.addForm.value.title} ${this.addForm.value.firstName} ${this.addForm.value.lastName}`);
    }
  }

}
