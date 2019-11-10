import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Email } from "../models/Email";

import { Observable } from "rxjs";
import "rxjs/Rx";
import { EmailsComponent } from "../components/emails/emails.component";
import { database } from "firebase";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  emailsCollection: AngularFirestoreCollection<Email>;
  emails: Observable<Email[]>;
  emailDoc: AngularFirestoreDocument<Email>;
  constructor(public afs: AngularFirestore) {
    //this.emails = this.afs.collection("Emails").valueChanges();

    this.emailsCollection = this.afs.collection("Emails");

    this.emails = this.afs
      .collection("Emails", ref => ref.orderBy("subject", "asc"))
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      });
  }

  getEmails() {
    return this.emails;
  }

  sendEmail(email: Email) {
    this.emailsCollection.add(email);
  }

  deleteEmail(email: Email) {
    this.emailDoc = this.afs.doc("Emails/" + email.id);
    this.emailDoc.delete().then();
  }

  updateEmail(email: Email) {
    this.emailDoc = this.afs.doc("Emails/" + email.id);
    this.emailDoc.update(email).then();
  }
}
