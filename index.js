var APP_ID = 'da24b1c3-3a63-41f8-92e8-22a4c7409a1e';

var mma = require('mma');
var Alexa = require("alexa-sdk");

var SKILL_NAME = "U. F. C. Fighter Statistics";
var HELP_MESSAGE = "Ask about a fighter and I'll do my best to answer.";
var HELP_REPROMPT = "What fighter do you want to know about?";
var STOP_MESSAGE = "Thank you for your time.;"

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

let handlers = {
    'fighterStats': function () {
        var Object = this;
        var intentObj = this.event.request.intent;
        let fighter = intentObj.slots.fighter.value;
        let statistic = intentObj.slots.statistic.value;
        if (!fighter) {
            let slotToElicit = 'AMAZON.Athlete';
            let speechOutput = "That doesn't seem to be a real fighter. Try another.";
            Object.emit(':elicitSlot', slotToElicit, speechOutput, HELP_REPROMPT);
            let fighter = intentObj.slots.fighter.value;
        }
        else if (!statistic) {
            // format stats so it shows only the essential info
            mma.fighter(fighter, function (data) {
                if (data == null) {
                    let slotToElicit = 'AMAZON.Athlete';
                    let speechOutput = HELP_REPROMPT;
                    Object.emit(':elicitSlot', slotToElicit, speechOutput, speechOutput);
                    let fighter = intentObj.slots.fighter.value;
                }
                else {
                    let speechOutput = data.fullname + ' is a ' + data.weight_class + ' from ' + data.nationality + ' with a record of ' + data.wins.total + ' wins and ' + data.losses.total + ' losses';
                    Object.emit(':tell', speechOutput);
                }
            });
        }
        else {
            // format stats so it shows only the essential info
            mma.fighter(fighter, function (data) {
                if (data == null) {
                    Object.emit(':tell', "That is not a real fighter!");
                }
                else {
                    // some of these need to be fixed so it matches json data
                    if (statistic == "weight class")
                        statistic = 'weight_class';
                    if (statistic == 'last fight')
                        statistic = 'fights';
                    if (statistic == 'weight in kilograms')
                        statistic = 'weight_kg';
                    if (statistic == 'height in centimeters')
                        statistic = 'height_cm';
                    if (statistic == 'old')
                        statistic = 'age';

                    if (!data[statistic]) {
                        let slotToElicit = 'statistic';
                        let speechOutput = 'That doesn\'t seem to be an available statistic. What statistic do you want to know about?';
                        let speechRepromt = 'Still not quite. Try another statistic.';
                        Object.emit(':elicitSlot', slotToElicit, speechOutput, speechRepromt);
                        let statistic = intentObj.slots.statistic.value;
                    }

                    // some of the data are objects within the json so I need to break it up
                    else {
                        let name = data.name;
                        let speechOutput = name;
                        data = data[statistic];
                        switch (statistic) {
                            case 'wins':
                            case 'losses':
                                speechOutput += ' has a total of '
                                    + data.total + ' ' + statistic + '. The ' + statistic + ' are by '
                                    + data.knockouts + " knockouts, "
                                    + data.submissions + " submissions, "
                                    + data.decisions + " decisions, and "
                                    + data.others + " other " + statistic + '.';
                                break;
                            case 'strikes':
                                speechOutput += ' has attempted '
                                    + data.attempted + ' strikes; '
                                    + data.successful + ' were successful. '
                                    + data.standing + ' were while standing, '
                                    + data.clinch + ' were in the clinch, and '
                                    + data.ground + ' were on the ground.';
                                break;
                            case 'takedowns':
                                speechOutput += ' has attempted '
                                    + data.attempted + ' takedowns; '
                                    + data.successful + ' were successful. '
                                    + data.submissions + ' were submissions, '
                                    + data.passes + ' were passes, and '
                                    + data.sweeps + ' were sweeps.';
                                break;
                            case 'fights':
                                data = data[0];
                                speechOutput += '\'s last fight was '
                                    + data.name + '. It happened on '
                                    + data.date + '. ' + name + ' fought '
                                    + data.opponent + '. It ended as a '
                                    + ((data.result == "NC") ? "no contest" : data.result) + ' by '
                                    + ((data.method == "NC") ? "no contest" : data.result) + '. The fight went '
                                    + data.round + ' rounds and was refereed by '
                                    + data.referee;

                                break;
                            case 'weight_class':
                                speechOutput += "'s weight class is, " + data;
                                break;
                            case 'weight_kg':
                                speechOutput += "'s weight is " + data + ' kilograms';
                                break;
                            case 'height_cm':
                                speechOutput += "'s height is " + data + ' centimeters';
                                break;
                            case 'age':
                                speechOutput += ' is ' + data + ' years old';
                                break;
                            default:
                                speechOutput += "'s " + statistic + " is, " + data;
                                break;
                        }

                        Object.emit(':tell', speechOutput);
                    }
                }
            });
        }
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Unhandled': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
    },
    'LaunchRequest': function () {
        this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
    },
};