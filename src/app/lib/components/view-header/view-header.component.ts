import { Component, OnInit, Input } from '@angular/core';
export type BootstrapColor = 'primary' | 'secondary' | 'success' |'warning' | 'danger' | 'info' | 'light' | 'dark';
@Component({
  selector: 'app-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.scss']
})
export class ViewHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() subtitleColor: BootstrapColor = 'secondary';
  @Input() imgSrc: string;
  @Input() color = 'primary';
  constructor() { }

  ngOnInit(): void {
  }

}
