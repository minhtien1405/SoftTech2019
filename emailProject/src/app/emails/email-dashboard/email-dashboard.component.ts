import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-dashboard',
  templateUrl: './email-dashboard.component.html',
  styleUrls: ['./email-dashboard.component.css']
})
export class EmailDashboardComponent implements OnInit {
  content: string;
  subject: string;

  buttonText:string ="Send Email"

  constructor(private auth: AuthService, private emailService: EmailService) { }

  ngOnInit() {
  }

  sendEmail(){
    const data = {
      sentBy: this.auth.authState.displayName || this.auth.authState.email,
      userId: this.auth.currentUserId,
      content: this.content,
      date: new Date(),
      subject: this.subject
    };
    this.emailService.send(data)
    this.subject=''
    this.content=''
    this.buttonText="Email Sent!"

    setTimeout(()=>  this.buttonText ="Send Email",3000)

  }
}
