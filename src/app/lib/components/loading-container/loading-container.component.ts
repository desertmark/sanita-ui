import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';

@Component({
  selector: 'app-loading-container',
  templateUrl: './loading-container.component.html',
})
export class LoadingContainerComponent implements OnInit {
  @Input() isLoading = false;
  @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
