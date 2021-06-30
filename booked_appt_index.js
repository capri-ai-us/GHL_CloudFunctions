/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const axios = require('axios');
exports.sendSlackMessageApptBooked = async(req, res) => {
 let message = '';
   messagesArr = [];
   if(process.env.SEND_FULL_SUBMISSION == "FALSE"){
     for(i=1;i<=process.env.NUMBER_OF_SUBMISSIONS;i++){
       envVar = 'SUBMISSION_VALUE' + i
       evnVarName = 'SUBMISSION_NAME' + i
       objValue = process.env[envVar]
       value = req.body[objValue]
       varName = process.env[evnVarName]
       message += varName + ' : ' + value + '\n'
       
     }
     
   }
   else {
    messageObj = req.query || req.body || 'No Message Found';
    for(const entry in req.body){
        message += entry + ' : ' + req.body[entry]+ '\n\n'
    }
   }
   if(process.env.SLACK_NOTIFICATION_MESSAGE){
     message = process.env.SLACK_NOTIFICATION_MESSAGE + ' \n' + message
   }
   var appt = req.body.calendar
   var startTime = appt.startTime
   startTimeArr = startTime.split('T');
   var date = startTimeArr[0];
   var dateArr = date.split('-');
   var datePretty = dateArr[1] + '-' + dateArr[2]
   var time = startTimeArr[1];
   var timeArr = time.split(':');
   var hourInt = parseInt(timeArr[0])
   if(hourInt>12){
     var prettyHour = hourInt -12
     var timePretty = prettyHour + ':' + timeArr[1] + 'pm' 
   }
   else if(hourInt == 12){
     var timePretty = prettyHour + ':' + timeArr[1] + 'pm'
   }
   else{
     var timePretty = timeArr[0] + ':' + timeArr[1] +'am'
   }
   

   message += '\n Appointment Date : ' + datePretty + '\n \n Appointment Time : ' + timePretty 
   slackReq = {
     method : 'POST',
     url : process.env.SLACK_APP_URL,
     data : {
       'text' : message
     },
     headers : {
       'content-type' : 'application/json',
       'accept' : '*/*'
     }
   }
    try{
      await axios(slackReq)
      res.sendStatus(200)
    }
    catch(err){
      res.send(err)
    }
};
