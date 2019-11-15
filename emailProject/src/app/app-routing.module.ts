import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { EmailPageComponent } from "./email-page/email-page.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "email",
    component: EmailPageComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [LoginComponent, EmailPageComponent];
