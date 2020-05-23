import { Component, OnInit, Input } from '@angular/core';
import { faCoffee, IconDefinition, faLock, faEye, faCircleNotch, faUserCircle, faCreditCard, faMoneyBillWave, faBox, faSearch } from '@fortawesome/free-solid-svg-icons';

const ICON_MAP = {
  coffee: faCoffee,
  lock: faLock,
  eye: faEye,
  circleNotch: faCircleNotch,
  userCircle: faUserCircle,
  creditCard: faCreditCard,
  moneyBillWave: faMoneyBillWave,
  box: faBox,
  search: faSearch,
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
