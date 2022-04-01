import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editview',
  templateUrl: './editview.component.html',
  styleUrls: ['./editview.component.scss']
})
export class EditviewComponent implements OnInit {


  constructor(
    private location: Location,
  ) { }

  public ngOnInit(): void {}

  public goBack(): void {
    this.location.back();
  }

}
