const functions = require('firebase-functions');

/**
 * EXAMPLE 1
 * Removing profanity and guessing languages of messages
 * 
 * messageLanguageTagger('This is a test!',{params: {messageId: 'testId1'}})
 */

var franc = require('franc');
var swearjar = require('swearjar');
var _ = require('lodash');

exports.messageLanguageTagger = functions.database.ref('/textMessages/{messageId}').onCreate(event => {

    const message = event.data.val();

    const language = franc(message);
    const isProfane = swearjar.profane(message);
    const cleanMessage = swearjar.censor(message);

    const preText = language && language !== 'und' ? language : emoji.get('question');
    const profanityEmoji = isProfane ? _.sample(["👹", "🙃", "💩", "🤐", "👎", "☹️"]) : _.sample(["😍", "😻", "😘", "🤗", "🙌", "👍"]);

    return event.data.ref.parent.parent.child('taggedTextMessages').push(`${profanityEmoji} (${preText}) ${cleanMessage}`);

});
















/**
 * EXAMPLE 2
 * Texting customers with lovely deeplinks
 * textReferralSender('0876914896', {params: {phoneNumberId: 'testPhone1'}})
 */

var twilioClient = require('twilio');
var cats = require('cat-ascii-faces');

exports.textReferralSender = functions.database.ref('/phoneNumbers/{phoneNumberId}').onCreate(event => {
    const phoneNumber = event.data.val();

    console.log(functions.config());

    var accountSid = functions.config().twilio.account_sid;
    var authToken = functions.config().twilio.auth_token;
    var fromNumber = functions.config().twilio.from_number;

    console.log(`${accountSid} and ${authToken}`)
    var client = new twilioClient(accountSid, authToken);

    return client.messages.create({
            body: `The cat thinks you should download Bamboo https://zj5z2.app.goo.gl/XTMY    ${cats()}`,
            to: phoneNumber,
            from: '+353861802824'
        })
        .then((message) => console.log(message.sid));
});