import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective {
  @Input() loading: boolean = false;

  @HostBinding('class.loading')
  get isLoading(): boolean {
    return this.loading;
  }
}
