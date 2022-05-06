import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesState } from 'src/app/private/articles/articles.state';
import { LoginState } from 'src/app/public/login/login.state';
import { AppState, UserRolesEnum } from 'src/app/app.state';
import { Article } from 'src/app/api/articles.api';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/lib/components/toast/toast.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnDestroy {
  userRoles =  UserRolesEnum;
  subscriptions: SubscriptionLike[] = [];
  modalRef: NgbModalRef;
  articleToDelete: Article;
  constructor(
    public articleState: ArticlesState,
    public loginState: LoginState,
    public appState: AppState,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  details(article: Article) {
    this.articleState.currentArticle$.next(article);
    this.router.navigate([`/private/articles/${article.id}`]);
  }

  openDeleteModal(template, article: Article) {
    this.articleToDelete = article;
    this.modalRef = this.modalService.open(template);
  }

  closeModal() {
    this.modalRef.close();
  }

  deleteArticle() {
    const sub = this.articleState.deleteArticle(this.articleToDelete).subscribe();
    this.subscriptions.push(sub);
    this.closeModal();
    this.toastService.success({
      body: {
        leftIcon: 'trashAlt',
        description: 'Producto eliminado correctamente.'
      }
    });
  }

}
