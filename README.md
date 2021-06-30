# Please Read Before Attempting To Use!
Use cloud functions to automate your workflow for free!

Use the following environment variables in your cloud function to specify which slack channel, and form/event you want to specify

# GoHighLevel Form Submitted :

  ENVIRONMENT VARIABLES :
  
  
   SLACK_APP_URL : <Your Slack App URL>
  
   SEND_FULL_SUBMISSION : boolean, "TRUE" or "FALSE" --setting true will ignore the rest of the environment variables and send the entire form request
  
   NUMBER_OF_SUBMISSIONS : number --total number of the form questions you want to display
  
   SLACK_NOTIFICATION_MESSAGE : "We got a new form submission!" -- the message you want to display at the top of the slack message
  
   SUBMISSION_NAME1 : First Name --how you want to display the first entry name
  
   SUBMISSION_VALUE1 : first_name -- the actual formatted name sent by the API
  
   SUBMISSION_NAME2 : Last Name
  
   SUBMISSION_VALUE2 : last_name
  
   SUBMISSION_NAME3 : Email
  
   SUBMISSION_VALUE3 : email
  
 
