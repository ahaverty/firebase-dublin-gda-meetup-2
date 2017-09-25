const functions = require('firebase-functions');
var franc = require('franc');
var emoji = require('node-emoji');
var swearjar = require('swearjar');

exports.messageLanguageTagger = functions.database.ref('/messages/{messageId}').onCreate(event => {
    const message = event.data.val();
    const language = franc(message);
    const isProfane = swearjar.profane(message);
    const cleanMessage = swearjar.censor(message);

    const preText = language && language !== 'und' ? language : emoji.get('question');
    const profanityEmoji = isProfane ? emoji.get('frowning') : "\uD83D\uDE00";

    console.log(`TEST Alan: ${profanityEmoji}`);

    return event.data.ref.parent.parent.child('taggedTextMessages').push(`${profanityEmoji} (${preText}) ${cleanMessage}`);
});

// messageLanguageTagger('this is a test',{params: {messageId: 'testId1'}})