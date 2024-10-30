import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core'

@Directive({
  selector: '[appFullWidthText]',
  standalone: true,
})
export class FullWidthTextDirective implements AfterViewInit {
  private maxFontSize = 200
  private minFontSize = 10
  private observer: MutationObserver

  constructor(private el: ElementRef) {
    this.observer = new MutationObserver(() => this.resizeTextToFullWidth())
  }

  ngAfterViewInit(): void {
    this.resizeTextToFullWidth()

    this.observer.observe(this.el.nativeElement, {
      characterData: true,
      subtree: true,
    })
  }

  ngOnDestroy(): void {
    this.observer.disconnect()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeTextToFullWidth()
  }

  /* Set text to large font size, then make smaller until it fits the screen */
  private resizeTextToFullWidth(): void {
    const element = this.el.nativeElement
    let fontSize = this.maxFontSize
    element.style.fontSize = `${fontSize}px`

    while (element.scrollWidth > window.innerWidth && fontSize > this.minFontSize) {
      fontSize -= 1
      element.style.fontSize = `${fontSize}px`
    }
  }
}
