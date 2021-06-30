/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const axios = require('axios')
exports.SlackChannelMessage = async(req, res) => {
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
