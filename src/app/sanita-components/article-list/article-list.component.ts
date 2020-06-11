import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesState } from 'src/app/private/articles/articles.state';
import { LoginState } from 'src/app/public/login/login.state';
import { AppState, UserRolesEnum } from 'src/app/app.state';
import { Article } from 'src/app/api/articles.api';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnDestroy {
  userRoles =  UserRolesEnum;
  subscriptions: SubscriptionLike[] = [];
  constructor(
    public articleState: ArticlesState,
    public loginState: LoginState,
    public appState: AppState,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  details(article: Article) {
    this.articleState.currentArticle$.next(article);
    this.router.navigate([`/private/articles/${article._id}`]);
  }

  deleteArticle(article: Article) {
    const sub = this.articleState.deleteArticle(article).subscribe();
    this.subscriptions.push(sub);
  }

}
