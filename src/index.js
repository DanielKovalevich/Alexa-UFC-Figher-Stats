'use strict'
var APP_ID = undefined;

var mma = require('mma');
var Alexa = require("alexa-sdk");

var SKILL_NAME = "U. F. C. Fighter Statistics";
var HELP_MESSAGE = "Ask about a fighter and I'll do my best to answer.";
var HELP_REPROMPT = "What fighter do you want to know about?";
var STOP_MESSAGE = "Thank you for your time.;"

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

let handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', HELP_REPROMPT);
    },
    'fighterStats' : fighterStatistics(),
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var repromt = HELP_REPROMPT;
        this.emit(':ask', speechOutput. repromt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
}

function fighterStatistics() {
    var intentObj = this.event.request.intent;
    let fighter = intentObj.slots.fighter.value;
    let statistic = intentObj.slots.statistic.value;
    if (!fighter) {
        let slotToElicit = 'AMAZON.US_FIRST_NAME';
        let speechOutput = HELP_REPROMPT;
        this.emit(':elicitSlot', slotToElicit, speechOutput, speechOutput);
    }
    else if (!statistic) {
        // format stats so it shows only the essential info
        mma.fighter(fighter, function(data) {
            let speechOutput = data.fullname + " is a " + data.weight_class + " from " + data.nationality + " with a record of " + data.wins.total + " wins and " + data.losses.total + " losses";
            this.emit(':tell', speechOutput);
        });
    }
    else {
        // format stats so it shows only the essential info
        mma.fighter(fighter, function(data) {
            if (!data.statistic) {
                this.emit(':tell', "Sorry. I don't think I know that one.");
            }
            else {
                let speechOutput = data.name + "'s " + statisitc + " is " + data.statisitc;
                this.emit(':tell', speechOutput);
            }
        });
    }
}