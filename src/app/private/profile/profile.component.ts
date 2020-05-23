import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/public/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(public appState: AppState) { }

  ngOnInit(): void {
  }

}
