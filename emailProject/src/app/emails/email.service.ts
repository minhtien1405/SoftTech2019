import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore'
import 'rxjs/add/operator/map';

import { Email } from './email';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emailsCollection: AngularFirestoreCollection<Email>;
  emailDoc: AngularFirestoreDocument<Email>;
  constructor(private afs: AngularFirestore) {
    this.emailsCollection = this.afs.collection('Emails', ref => ref.orderBy('subject', 'desc'))
  }

  getEmails() {
    return this.emailsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Email
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })
  }

  getEmailData(id: string) {
    this.emailDoc = this.afs.doc<Email>(`Emails/${id}`)
    return this.emailDoc.valueChanges()
  }

  send(data: Email) {
    this.emailsCollection.add(data);
  }
  getEmail(id: string) {
    return this.afs.doc<Email>(`Emails/${id}`);
  }
  delete(id: string) {
    return this.getEmail(id).delete()
  }
  update(id: string, formData) {
    return this.getEmail(id).update(formData)
  }

}
