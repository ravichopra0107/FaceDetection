const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = (body, to) => {
    client.messages
    .create({
       body: body,
       from: '+13125868852',
       to: to
     })
    .then(message => console.log(message.sid));
}

module.exports = sendMessage;