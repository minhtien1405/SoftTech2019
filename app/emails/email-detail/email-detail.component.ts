import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { EmailService } from '../email.service';
import { Email } from '../email';
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent implements OnInit {

  email: Email;
  reply: boolean = false;
  replyContent: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private emailService: EmailService

  ) { }

  ngOnInit() {
    this.getEmail()
  }

  getEmail(){
    const id = this.route.snapshot.paramMap.get('id')
    return this.emailService.getEmailData(id).subscribe(data=> this.email = data)
  }

  updateEmail(){
    const formData = {
      subject: this.email.subject,
      content: this.email.content
    }
    const id = this.route.snapshot.paramMap.get('id')

    this.emailService.update(id,formData);
    this.reply = false;
  }

  replyEmail() {
    const data = {
      content: this.replyContent,
      userId: this.auth.currentUserId,
      date: new Date(),
      subject: "Reply " + this.email.subject,
      sendTo: this.email.sentBy,
      sentBy: this.auth.authState.displayName || this.auth.authState.email,
      classification:-2
    }
    this.emailService.send(data)
    this.reply = false;
  }


  delete(){
    const id = this.route.snapshot.paramMap.get('id')
    this.emailService.delete(id)
    this.router.navigate(["/email-page"])

  }
}
