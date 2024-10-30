import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs'
import { map, takeWhile } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownSubscription: Subscription | null = null
  private countdown$ = new BehaviorSubject<string>('')
  startCountdown(targetDate: Date): void {
    this.clearCountdown()
    this.countdownSubscription = interval(1000)
      .pipe(
        map(() => this.calculateTimeLeft(targetDate)),
        takeWhile(time => time !== '0 days, 0h, 0m, 0s'),
      )
      .subscribe(time => this.countdown$.next(time))
  }

  getCountdown(): Observable<string> {
    return this.countdown$.asObservable()
  }

  clearCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe()
      this.countdownSubscription = null
    }
  }

  private calculateTimeLeft(targetDate: Date): string {
    const now = new Date().getTime()
    const target = targetDate.getTime()
    const difference = target - now

    if (difference <= 0) {
      return '0 days, 0h, 0m, 0s'
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return `${days} days, ${hours}h, ${minutes}m, ${seconds}s`
  }
}
