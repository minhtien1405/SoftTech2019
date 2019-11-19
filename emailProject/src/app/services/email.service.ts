import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Email } from "../models/Email";

import { Observable } from "rxjs";
import "rxjs/Rx";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { ReturnStatement } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  emailsCollection: AngularFirestoreCollection<Email>;
  emails: Observable<Email[]> = null;
  emailDoc: AngularFirestoreDocument<Email>;
  userId: string;
  userIDcurrent: string;

  constructor(
    public afs: AngularFirestore,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    //this.emails = this.afs.collection("Emails").valueChanges();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.emails = this.afs
          .collection("Emails", ref => ref.orderBy("userId", "asc"))
          .snapshotChanges()
          .map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Email;
              data.id = a.payload.doc.id;
              return data;
            });
          });
      }
    });
    this.emailsCollection = this.afs.collection("Emails");
  }

  getEmails() {
    return this.emails;
  }

  sendEmail(email: Email) {
    email.userId = this.userId;
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
