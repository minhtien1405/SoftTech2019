import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailDashboardComponent } from './email-dashboard/email-dashboard.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { EmailListComponent } from './email-list/email-list.component';
import { SharedModule } from '../shared/shared.module';
import { EmailService } from './email.service';

const routes: Routes = [
  { path: 'email-page', component: EmailListComponent},
  { path: 'email-page/:id', component: EmailDetailComponent},
  { path: 'dashboard', component: EmailDashboardComponent}
]

@NgModule({
  declarations: [EmailDashboardComponent, EmailDetailComponent, EmailListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [EmailService]
})
export class EmailsModule { }
