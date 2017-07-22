var mma = require('mma');

let fighter = 'pizza';
let statistic = 'wins';

mma.fighter(fighter, function (data) {
    if (data == null) {
        console.log('it ends here');
    }
    else {
        console.log(data);
        if (!fighter) {
            let speechOutput = "HELP_REPROMPT";
            console.log(speechOutput);
        }
        else if (!statistic) {
            // format stats so it shows only the essential info
            mma.fighter(fighter, function (data) {
                if (data == null) {
                    console.log('it ends here');
                }
                let speechOutput = data.fullname + " is a " + data.weight_class + " from " + data.nationality + " with a record of " + data.wins.total + " wins and " + data.losses.total + " losses";
                console.log(speechOutput);
            });
        }
        else {
            // format stats so it shows only the essential info
            mma.fighter(fighter, function (data) {
                if (data == null) {
                    console.log('it ends here');
                }
                else {
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
                        console.log("Sorry. I don't think I know that one.");
                    }
                    else {
                        let name = data.name;
                        let speechOutput = name;
                        data = data[statistic];
                        console.log(data);
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
                        console.log(speechOutput);
                    }
                }
            });
        }
    }
});