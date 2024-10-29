import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EventCountdownComponent } from './components/event-countdown/event-countdown.component'
import { FullWidthTextDirective } from './directives/full-width-text.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, EventCountdownComponent, FormsModule, FullWidthTextDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FrontendChallenge'
}
