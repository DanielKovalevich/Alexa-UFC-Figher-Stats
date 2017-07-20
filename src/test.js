var mma = require('mma');

mma.fighter("Jon Jones", function (data) {
    let fighter = "jones";
    let statistic = 'age';
    if (!fighter) {
        let speechOutput = "HELP_REPROMPT";
        console.log(speechOutput);
    }
    else if (!statistic) {
        // format stats so it shows only the essential info
        mma.fighter(fighter, function(data) {
            let speechOutput = data.fullname + " is a " + data.weight_class + " from " + data.nationality + " with a record of " + data.wins.total + " wins and " + data.losses.total + " losses";
            console.log(speechOutput);
        });
    }
    else {
        // format stats so it shows only the essential info
        mma.fighter(fighter, function(data) {
            if (!data[statistic]) {
                console.log("Sorry. I don't think I know that one.");
            }
            else {
                let speechOutput = data.name + "'s " + statistic + " is " + data[statistic];
                console.log(speechOutput);
            }
        });
    }
});