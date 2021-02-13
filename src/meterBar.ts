// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBR7BEXnWTScVSoJ5jzoFPfZuqb0tiZkx8",
    authDomain: "friendshipmeter.firebaseapp.com",
    projectId: "friendshipmeter",
    storageBucket: "friendshipmeter.appspot.com",
    messagingSenderId: "719040243429",
    appId: "1:719040243429:web:4b5b111f1f7a07afca960c",
    measurementId: "G-XVTEWPHJYL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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