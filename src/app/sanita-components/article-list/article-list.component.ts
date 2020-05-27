import { Component, OnInit } from '@angular/core';
import { ArticlesState } from 'src/app/private/articles/articles.state';
import { LoginState } from 'src/app/public/login/login.state';
import { AppState, UserRolesEnum } from 'src/app/app.state';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  userRoles =  UserRolesEnum;
  constructor(
    public articleState: ArticlesState,
    public loginState: LoginState,
    public appState: AppState,
  ) {
  }

  ngOnInit(): void {
  }

}
