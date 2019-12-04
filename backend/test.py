# -*- coding: utf-8 -*-
"""
Created on Tue Nov 26 22:33:56 2019

@author: Tien
"""

from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import re

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    # Call the Gmail API
    call_latest_id = service.users().messages().list(userId='me').execute()
    ids = call_latest_id.get('messages', [])

    if not ids:
        print('No email id found.')
    else:
        print('ids:')
        print(ids[0]['id'])
        
        call_email = service.users().messages().get(id=ids[0]['id'] , userId='me').execute()
        emailBody = call_email.get('snippet',[])
        emailHeader = call_email.get('payload',[])['headers']
        if not emailBody:
            print('No email id found.')
        else:
            subject= [i['value'] for i in emailHeader if i["name"]=="Subject"]
            sender = [i['value'] for i in emailHeader if i["name"]=="From"]
            date = [i['value'] for i in emailHeader if i["name"]=="Date"]
            print(subject[0])
            print(sender[0])
            sender_email = re.search('<(.*)>',sender[0])
            print(sender_email.group(1))
            print(date)
            print("Email body")
            print(emailBody)
    
    file1 = open("lastEmail.txt","w")
    file1.write(subject[0] + "\n"+ sender_email.group(1) + "\n" + emailBody)
    file1.close()
if __name__ == '__main__':
    main()