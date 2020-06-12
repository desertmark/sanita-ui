import { Injectable } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapColor } from '../view-header/view-header.component';

export interface ToastOptions {
  header?: {
    leftIcon?: string;
    description: string;
  };
  body?: {
    leftIcon?: string;
    description: string;
  };
  delay?: number;
}

export interface Toast {
  options: ToastOptions;
  type: BootstrapColor;
  text: 'light' | 'dark';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  success(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'success'));
  }

  danger(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'danger'));
  }

  info(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'info'));
  }

  warning(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'warning'));
  }

  light(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'light'));
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }

  private createToast(options: ToastOptions, type: BootstrapColor): Toast {
    return {
      options,
      type,
      text: type === 'light' || type === 'warning' ? 'dark' : 'light',
    } as Toast;
  }
}
