var mma = require('mma');

mma.fighter("Jon Jones", function (data) {
    let fighter = "jones";
    let statistic = 'wins';
    if (!fighter) {
        let speechOutput = "HELP_REPROMPT";
        console.log(speechOutput);
    }
    else if (!statistic) {
        // format stats so it shows only the essential info
        mma.fighter(fighter, function (data) {
            let speechOutput = data.fullname + " is a " + data.weight_class + " from " + data.nationality + " with a record of " + data.wins.total + " wins and " + data.losses.total + " losses";
            console.log(speechOutput);
        });
    }
    else {
        // format stats so it shows only the essential info
        mma.fighter(fighter, function (data) {
            if (!data[statistic]) {
                console.log("Sorry. I don't think I know that one.");
            }
            else {
                let speechOutput = data.name;

                switch (statistic) {
                    case 'wins':
                        speechOutput += ' has a total of ' + data[statistic].total + ' wins. '
                            + data[statistic].knockouts + " knockouts, " + data[statistic].submissions + " submissions, "
                            + data[statistic].decisions + " decisions, and " + data[statistic].others + " other wins."
                        break;
                    default:
                        speechOutput += "'s " + statistic + " is, " + data[statistic];
                        break;
                }
                console.log(speechOutput);
            }
        });
    }
});