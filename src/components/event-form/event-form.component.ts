import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { InputComponent } from '../input/input.component'
import { CommonModule } from '@angular/common'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { LocalStorageService } from '../../services/local-storage/local-storage.service'

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent {
  @Output() formSubmit = new EventEmitter<{ title: string; date: Date }>()
  @Input() initialTitle: string = ''
  @Input() initialStartDate: string = ''
  public eventForm!: FormGroup
  private localStorageService = inject(LocalStorageService)
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: [
        this.initialTitle,
        [Validators.required, Validators.minLength(1), Validators.maxLength(25)],
      ],
      startDate: [this.initialStartDate, [Validators.required, this.futureDateValidator]],
    })
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const { title, startDate } = this.eventForm.value
      this.formSubmit.emit({ title, date: new Date(startDate) })
      this.localStorageService.setItem('eventTitle', title)
      this.localStorageService.setItem('eventDate', startDate)
    } else {
      this.eventForm.markAllAsTouched()
    }
  }

  get titleControl() {
    return this.eventForm.get('title') as FormControl
  }

  get startDateControl(): FormControl {
    return this.eventForm.get('startDate') as FormControl
  }

  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value)
    const now = new Date()
    return selectedDate > now ? null : { notInFuture: true }
  }
}
