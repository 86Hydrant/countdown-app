import { Component, Input } from '@angular/core'
import { FullWidthTextDirective } from '../../directives/full-width-text.directive'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FullWidthTextDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() content!: string
}
