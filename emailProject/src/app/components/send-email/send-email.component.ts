import { Component, OnInit } from "@angular/core";
import { EmailService } from "../../services/email.service";
import { Email } from "../../models/Email";

@Component({
  selector: "app-send-email",
  templateUrl: "./send-email.component.html",
  styleUrls: ["./send-email.component.css"]
})
export class SendEmailComponent implements OnInit {
  email: Email = {
    subject: "",
    content: ""
  };
  constructor(private emailService: EmailService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.email.subject != "" && this.email.content != "") {
      this.emailService.sendEmail(this.email);
      this.email.subject = "";
      this.email.content = "";
    }
  }
}
