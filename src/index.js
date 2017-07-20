'use strict'
var APP_ID = undefined;

var mma = require('mma');
var Alexa = require("alexa-sdk");

let states = {
    FIGHTER: "_FIGHTER",
    HELP: "_HELP",
}

var SKILL_NAME = "U. F. C. Fighter Statistics";
var HELP_MESSAGE = "Ask about a fighter and I'll do my best to answer.";
var STOP_MESSAGE = "Thank you for your time.;"

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

let handlers = {
    'LaunchRequest': function () {
        this.emit('fighter');
    },
    'fighter' : function () {

    }
}

// test function
mma.fighter("Daniel Cor", function(data) {
    console.log(data);
});
