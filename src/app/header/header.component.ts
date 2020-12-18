import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn:any;
  constructor() { }

  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem('user');
  }


}
