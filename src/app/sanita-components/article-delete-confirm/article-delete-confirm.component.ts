import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-article-delete-confirm',
  templateUrl: './article-delete-confirm.component.html',
  styleUrls: ['./article-delete-confirm.component.scss']
})
export class ArticleDeleteConfirmComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onCancel(){
    this.cancel.emit();
  }

  onDeleteConfirm(){
    this.confirmDelete.emit();
  }

}
