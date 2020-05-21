import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() fullScreen = false;
  @Input() overlay = false;
  constructor() { }

  ngOnInit(): void {
  }

  get position(): string {
    return this.fullScreen ? 'fixed' : 'absolute';
  }


}
