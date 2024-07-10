import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumber]',
  standalone: true
})
export class PhoneNumberDirective {
  private readonly prefix = '+233'

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (!value.startsWith(this.prefix)) {
      this.control.control?.setValue(this.prefix + value.replace(this.prefix, ' '))
    }
  }

  @HostListener('focus')
  onFocus(): void {
    if (!this.el.nativeElement.value.startsWith(this.prefix)) {
      this.el.nativeElement.value = this.prefix + this.el.nativeElement.value
    }
  }
}