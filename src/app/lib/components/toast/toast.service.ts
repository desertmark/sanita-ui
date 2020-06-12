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

  darkTextColors = ['light', 'warning', 'secondary'];

  success(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'success'));
  }

  danger(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'danger'));
  }

  secondary(options: ToastOptions) {
    this.toasts.push(this.createToast(options, 'secondary'));
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
      text: this.darkTextColors.includes(type) ? 'dark' : 'light',
    } as Toast;
  }
}
