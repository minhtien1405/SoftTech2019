# -*- coding: utf-8 -*-
"""
Created on Thu Nov 28 20:28:16 2019

@author: Tien
"""
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("smartcoordinator-8c5e5-firebase-adminsdk-zz48k-a103aac524.json")

project_id = 'smartcoordinator-8c5e5'
#firebase_admin.initialize_app(cred, { 'projectId': project_id})

f=open("latestEmailFlaged.txt","r")
email_subject= f.readline();
email_classification = int(f.readline())
sender = f.readline()
email_content= f.readline();
f.close()
db = firestore.client()
data = {
    u'content': email_content,
    u'date': datetime.datetime.now(),
    u'sentBy': sender,
    u'sendTo': u'email.classification.project@gmail.com',
    u'subject': email_subject,
    u'userId': u'b3Grc48OMcdjSd3KARXA4QZ6C5K2',
    u'classification': email_classification
}

db.collection(u'Emails').add(data)

print('initialized')