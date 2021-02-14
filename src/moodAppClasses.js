export class User {

    name;
    email; // this should be the auth's uid
    friendsList;
    metrics;
    responses;

    constructor(name, email, friendsList, metrics, responses) {
        this.name = name;
        this.email = email;
        this.friendsList = friendsList;
        this.metrics = metrics;
        this.responses = responses;
    }

    getName() {
        return this.name;
    }

    getEmail()  {
        return this.email;
    }

    getFriendsList() {
        return this.friendsList;
    }

    getMetrics() {
        return this.metrics;
    }

    getResponses() {
        return this.responses;
    }

    setEmail(newEmail) {
        this.email = newEmail;
    }

    setFriendsList(newFriendsList) {
        this.friendsList = newFriendsList;
    }

    setMetrics(newMetrics) {
        this.metrics = newMetrics;
    }

    setResponses(newResponses) {
        this.responses = newResponses;
    }
}

class meterBar {

    point;
    CHANGE_AMOUNT = 5;

    constructor() {
        this.point = 50;
    }

    incVal() {
        this.point += 5;
    }

    decVal() {
        this.point -= 5;
    }

    getCurrentVal()  {
        return this.point;
    }

    // return "RED" or "YELLOW" or "GREEN"
    getColor() {
        if (this.point < 30) {
            return "RED";
        } else if (this.point < 60) {
            return "YELLOW";
        } else {
            return "GREEN";
        }
    }
}


class Survey {

    greenQns = ["How is your day going?", "Any issues you want to talk about?", "If you could live anywhere, where would it be?", "What weird food combinations do you really enjoy?"];
    yellowQns = ["How are you feeling today?", "Anything you want to talk about?", "Any issues you want to talk about?"];
    redQns = ["Are you alive?"];

    responses; // recorded responses here, pass this to machine learning algorithm in the future
    currentMeterBar;

    constructor(bar, moreGreenQns, moreYellowQns, moreRedQns) {
        this.currentMeterBar = bar;
        this.greenQns = this.greenQns.concat(moreGreenQns);
        this.yellowQns = this.greenQns.concat(moreYellowQns);
        this.redQns = this.greenQns.concat(moreRedQns);
    }

    getSurveyQuestions() {
        let color = this.currentMeterBar.getColor();

        if (color === "GREEN") {
            return this.greenQns;
        } else if (color === "YELLOW") {
            return this.yellowQns;
        } else {
            return this.redQns;
        }
    }

    recordResponses(responses) {
        this.responses = responses;
    }

}