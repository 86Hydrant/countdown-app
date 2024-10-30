import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss',
})
export class SubheaderComponent {
  @Input() content!: string
}