import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginState } from 'src/app/public/login/login.state';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('expandable') expandable: ElementRef<any>;
  loginLink = { title: 'Login', url: 'public/login' };
  links = [
    { title: 'Articles', url: 'private/articles', icon: 'thList' },
    { title: 'Actualizar', url: 'private/articles/bulk-edit', private: true, icon: 'sync' },
    { title: 'Profile', url: 'private/profile', private: true, icon: 'userCircle' },
  ];
  subscriptions: SubscriptionLike[] = [];
  collapsed = true;
  constructor(
    public route: ActivatedRoute,
    public loginState: LoginState,
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
