import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @Input() UserData: any;
  constructor() { }

  ngOnInit() {
    console.log(this.UserData);
  }
}
