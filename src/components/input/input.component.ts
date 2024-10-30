import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label!: string
  @Input() placeholder!: string
  @Input() type: string = 'text'
  @Input() testId: string = ''
  @Input() control = new FormControl()
}
