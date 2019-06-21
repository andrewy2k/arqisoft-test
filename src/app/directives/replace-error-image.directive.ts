// Директива замены отсутсвующей картинки на типовую

import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appReplaceErrorImage]',
  host: {
    '[src]': 'src'
  }
})
export class ReplaceErrorImageDirective {
  @Input() src: string;
  @Input() default: string = './assets/images/photo-not-found.jpg';

  @HostListener('error')
  updateUrl() {
    this.src = this.default;
  }
}
