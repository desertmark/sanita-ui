import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  links = [
    { title: 'Login', url: 'public/login' },
    { title: 'Profile', url: 'private/profile' }
  ];
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
