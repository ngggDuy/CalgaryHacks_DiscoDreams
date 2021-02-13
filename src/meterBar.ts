export class meterBar {

    private point: number;
    private CHANGE_AMOUNT: number = 5;

    constructor() {
        this.point = 50;
    }

    public incVal() {
        this.point += 5;
    }

    public decVal() {
        this.point -= 5;
    }

    public getCurrentVal():number  {
        return this.point;
    }

    // return "RED" or "YELLOW" or "GREEN"
    public getColor(): string {
        if (this.point < 30) {
            return "RED";
        } else if (this.point < 60) {
            return "YELLOW";
        } else {
            return "GREEN";
        }
    }
}


export class Survey {

    private greenQns: string[] = ["How is your day going?", "Any issues you want to talk about?", "If you could live anywhere, where would it be?", "What weird food combinations do you really enjoy?"];
    private yellowQns: string[] = ["How are you feeling today?", "Anything you want to talk about?", "Any issues you want to talk about?"];
    private redQns: string[] = ["Are you alive?"];

    private responses: string[]; // recorded responses here, pass this to machine learning algorithm in the future
    private currentMeterBar: any;

    constructor(bar: any, moreGreenQns: string[], moreYellowQns: string[], moreRedQns: string[]) {
        this.currentMeterBar = bar;
        this.greenQns = this.greenQns.concat(moreGreenQns);
        this.yellowQns = this.greenQns.concat(moreYellowQns);
        this.redQns = this.greenQns.concat(moreRedQns);
    }

    public getSurveyQuestions() {
        let color: string = this.currentMeterBar.getColor();

        if (color === "GREEN") {
            return this.greenQns;
        } else if (color === "YELLOW") {
            return this.yellowQns;
        } else {
            return this.redQns;
        }
    }

    public recordResponses(responses: string[]) {
        this.responses = responses;
    }

}