import { Component, OnInit, Input } from '@angular/core';
import { faCoffee, IconDefinition, faLock, faEye, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const ICON_MAP = {
  coffee: faCoffee,
  lock: faLock,
  eye: faEye,
  circleNotch: faCircleNotch,
};


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent implements OnInit {

  constructor() { }
  @Input() icon: string;
  @Input() size = '1rem';
  iconDefinition: IconDefinition;
  ngOnInit(): void {
    this.iconDefinition = ICON_MAP[this.icon];
  }

}
