import { Component, OnInit, Input } from '@angular/core';
export type BootstrapColor = 'primary' | 'secondary' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
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
  constructor() { }

  ngOnInit(): void {
  }

}
