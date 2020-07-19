export default class RRuleDTO {
    /** The start date for this rule */
    dTStart: Date;

    /** The frequency to apply this rule. Ex: Daily, Weekly, etc. */
    freq: string;

    /** The interval of frequency. Ex: If Freq=Weekly, then interval=2 is every other week */
    interval: number;

    /** The months that apply to this rule. Ex: [1, 3, 5] = January, March, May */
    byMonth: number[];

    /** The days of the month this rule applies to. Ex: [3, 6] = the third and sixth of a month */
    byMonthDay: number[];

    /** The weekdays this rule applies to. Ex: [1, 2, 4] = Sunday, Monday, Wednesday */
    byWeekday: number[];

    constructor(
        dTStart: Date,
        freq: string,
        interval: number,
        byMonth: number[],
        byMonthDay: number[],
        byWeekday: number[],
    ) {
        this.dTStart = dTStart;
        this.freq = freq;
        this.interval = interval;
        this.byMonth = byMonth;
        this.byMonthDay = byMonthDay;
        this.byWeekday = byWeekday;
    }
}
