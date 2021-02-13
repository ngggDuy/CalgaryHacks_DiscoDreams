class meterBar {

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

}