import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  emails: Observable<Email[]>;

  constructor(private emailService: EmailService,
              public auth:AuthService) { }

  ngOnInit() {
    this.emails = this.emailService.getEmails()
    console.log(this)
  }

  delete(id: string){
    this.emailService.delete(id);
  }

}
