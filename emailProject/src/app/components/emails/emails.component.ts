import { Component, OnInit } from "@angular/core";
import { EmailService } from "../../services/email.service";
import { Email } from "../../models/Email";

@Component({
  selector: "app-emails",
  templateUrl: "./emails.component.html",
  styleUrls: ["./emails.component.css"]
})
export class EmailsComponent implements OnInit {
  emails: Email[];
  editState: boolean = false;
  emailToEdit: Email;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    });
  }

  deleteEmail(event, email: Email) {
    this.clearState();
    this.emailService.deleteEmail(email);
  }

  editEmail(event, email: Email) {
    this.editState = true;
    this.emailToEdit = email;
  }

  updateEmail(email) {
    this.emailService.updateEmail(email);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.emailToEdit = null;
  }
}
