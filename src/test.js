var mma = require('mma');

var statisic = 'age';

mma.fighter("Jon Jones", function (data) {
    if (!data[statisic]) {
        console.log( "Sorry. I don't think I know that one.");
    }
    else {
        let speechOutput = data.name + "'s " + statisic + " is " + data[statisic];
        console.log(speechOutput);
    }
});