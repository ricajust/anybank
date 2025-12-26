import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  imports: [ DatePipe, TitleCasePipe ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  dateTime = new Date();

}
