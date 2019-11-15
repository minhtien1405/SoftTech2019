import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmailsComponent } from "./components/emails/emails.component";

import { EmailService } from "./services/email.service";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SendEmailComponent } from "./components/send-email/send-email.component";
import { fromPromise } from "rxjs/internal-compatibility";
import { EmailPageComponent } from "./email-page/email-page.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailsComponent,
    NavbarComponent,
    SendEmailComponent,
    routingComponents,
    EmailPageComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "emailProject"),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule {}
