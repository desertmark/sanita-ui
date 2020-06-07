import { Component, OnInit, OnDestroy } from '@angular/core';
import { BulkEditModel } from './bulk-edit.model';
import { BulkEditState } from './bulk-edit.state';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-bulk-edit',
  templateUrl: './bulk-edit.component.html',
  styleUrls: ['./bulk-edit.component.scss']
})
export class BulkEditComponent implements OnDestroy {
  form = new BulkEditModel();
  subscriptions: SubscriptionLike[] = [];

  constructor(public bulkEditState: BulkEditState) {
    this.initFileUpload();
    this.bulkEditState.startPollingStatus();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  update() {
    const values = this.form.values;
    const sub = this.bulkEditState.updateArticles(values).subscribe(
      () => this.form.reset(),
    );
    this.subscriptions.push(sub);
  }

  uploadFile() {
    const sub = this.bulkEditState.updateArticlesByFile(this.form.fileField.value).subscribe(
      () => {
        this.form.fileField.reset();
        this.bulkEditState.startPollingStatus();
      },
    );
    this.subscriptions.push(sub);
  }

  private initFileUpload() {
    const sub = this.form.fileField.valueChanges$.subscribe(
      value => console.log(value),
    );
    this.subscriptions.push(sub);
  }

  formatStatus(status: number) {
    return parseFloat(status.toFixed(2));
  }

}
