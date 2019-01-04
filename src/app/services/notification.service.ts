import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData } from 'ng2-toasty';
import { Subject, Observable, Subscription } from 'rxjs';
 
@Injectable()
export class NotificationService {
    constructor(private toastyService: ToastyService) { }
 
    success(title: string, message: string) {
        this.displayToast(title, message, 'success');
    };
 
    error(title: string, message: string) {
        this.displayToast(title, message, 'error');
    };
 
    info(title: string, message: string) {
        this.displayToast(title, message, 'info');
    };
 
    warning(title: string, message: string) {
        this.displayToast(title, message, 'warning');
    };
 
    private displayToast(title: string, message: string, type: string) {
        let interval = 1000;
        let timeout = 5000;
        let seconds = timeout / 1000;
        let subscription: Subscription;
 
        let toastOptions: ToastOptions = {
            title: title,
            msg: message,
            showClose: true,
            timeout: timeout,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {
            },
            onRemove: function (toast: ToastData) {
            }
        };
 
        switch (type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}