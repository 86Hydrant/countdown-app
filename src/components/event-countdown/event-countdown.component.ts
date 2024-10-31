import { Component, inject, ViewChild } from '@angular/core'
import { InputComponent } from '../input/input.component'
import { HeaderComponent } from '../header/header.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { CountdownService } from '../../services/countdown/countdown.service'
import { Subscription } from 'rxjs'
import { FullWidthTextDirective } from '../../directives/full-width-text.directive'
import { SubheaderComponent } from '../subheader/subheader.component'
import { LocalStorageService } from '../../services/local-storage/local-storage.service'
import { EventFormComponent } from '../event-form/event-form.component'

@Component({
  selector: 'app-event-countdown',
  standalone: true,
  imports: [
    InputComponent,
    HeaderComponent,
    SubheaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FullWidthTextDirective,
    SubheaderComponent,
    EventFormComponent,
  ],
  templateUrl: './event-countdown.component.html',
  styleUrl: './event-countdown.component.scss',
})
export class EventCountdownComponent {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent
  public eventTitle = ''
  public eventDate = ''
  public headerContent = 'Enter a title and a date!'
  public countdown: string = ''
  private countdownSubscription: Subscription = new Subscription()
  private countdownService = inject(CountdownService)
  private localStorageService = inject(LocalStorageService)

  ngOnInit(): void {
    this.countdownSubscription = this.countdownService.getCountdown().subscribe(time => {
      this.countdown = time
    })

    const initialTitle = this.localStorageService.getItem('eventTitle')
    const initialDate = this.localStorageService.getItem('eventDate')

    if (initialTitle && initialDate) {
      this.eventTitle = initialTitle
      this.eventDate = initialDate
      this.setCountdown(new Date(this.eventDate))
    }
    if (this.eventTitle) {
      this.headerContent = `Time to ${this.eventTitle}`
    }
  }

  onFormSubmit(eventData: { title: string; date: Date }): void {
    this.eventTitle = eventData.title
    this.headerContent = `Time to ${eventData.title}`
    this.setCountdown(eventData.date)
  }

  private setCountdown(targetDate: Date): void {
    this.countdownService.startCountdown(targetDate)
  }

  ngOnDestroy(): void {
    this.countdownService.clearCountdown()
  }
}
