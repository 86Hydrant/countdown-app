import { Component } from '@angular/core'
import { InputComponent } from '../input/input.component'
import { HeaderComponent } from '../header/header.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { CountdownService } from '../../services/countdown/countdown.service'
import { Subscription } from 'rxjs'
import { FullWidthTextDirective } from '../../directives/full-width-text.directive'

@Component({
  selector: 'app-event-countdown',
  standalone: true,
  imports: [InputComponent, HeaderComponent, CommonModule, ReactiveFormsModule, FullWidthTextDirective],
  templateUrl: './event-countdown.component.html',
  styleUrl: './event-countdown.component.scss',
})

export class EventCountdownComponent {
  eventForm: FormGroup
  eventTitle = ''
  eventDate = new Date('')
  countdown: string = ''
  private countdownSubscription: Subscription = new Subscription()

  constructor(private countdownService: CountdownService) {
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
    })
    this.eventForm.get('title')?.valueChanges.subscribe(title => {
      this.updateHeaderContent()
    })
  }
  onSubmit() {
    this.setCountdown()
  }

  get titleControl(): FormControl {
    return (this.eventForm.get('title') as FormControl) || new FormControl('')
  }

  get startDateControl(): FormControl {
    return (this.eventForm.get('startDate') as FormControl) || new FormControl('')
  }

  private updateHeaderContent() {
    const title = this.eventForm.get('title')?.value
    this.eventTitle = title ? title : ''
  }

  private setCountdown() {
    const targetDate = new Date(this.eventForm.get('startDate')?.value)
    this.countdownSubscription = this.countdownService
      .startCountdown(targetDate)
      .subscribe(time => (this.countdown = time))
  }
}
