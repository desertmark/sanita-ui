import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginState } from 'src/app/public/login/login.state';
import { SubscriptionLike } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('expandable') expandable: ElementRef<any>;
  loginLink = { title: 'Ingresar', url: 'public/login' };
  links = [
    { title: 'Productos', url: 'private/articles', icon: 'thList', private: true },
    { title: 'Actualizar', url: 'private/articles/bulk-edit', private: true, icon: 'sync', admin: true },
    { title: 'Perfil', url: 'private/profile', private: true, icon: 'userCircle' },
  ];
  subscriptions: SubscriptionLike[] = [];
  collapsed = true;
  constructor(
    public route: ActivatedRoute,
    public loginState: LoginState,
    public appState: AppState,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  logout() {
    const sub = this.loginState.logout().subscribe({
      next: () => this.router.navigate(['/public']),
    });
    this.subscriptions.push(sub);
  }

  toggleCollapsed() {
    this.collapsed ? this.show() : this.collapse();
  }

  private show() {
    this.expandable.nativeElement.classList.add('collapsing');
    this.expandable.nativeElement.classList.add('show');
    const height = this.expandable.nativeElement.children[0].offsetHeight;
    this.expandable.nativeElement.style.height = `${height}px`;
    this.collapsed = false;
  }

  private collapse() {
    this.expandable.nativeElement.style.height = `0px`;
    this.collapsed = true;
  }

}
