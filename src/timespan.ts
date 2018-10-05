export const ticksPerMillisecond = 10000;
export const millisecondsPerTick = 1.0 / ticksPerMillisecond;

export const ticksPerSecond = ticksPerMillisecond * 1000;   // 10,000,000
export const secondsPerTick = 1.0 / ticksPerSecond;         // 0.0000001

export const ticksPerMinute = ticksPerSecond * 60;         // 600,000,000
export const minutesPerTick = 1.0 / ticksPerMinute; // 1.6666666666667e-9

export const ticksPerHour = ticksPerMinute * 60;        // 36,000,000,000
export const hoursPerTick = 1.0 / ticksPerHour; // 2.77777777777777778e-11

export const ticksPerDay = ticksPerHour * 24;          // 864,000,000,000
export const daysPerTick = 1.0 / ticksPerDay; // 1.1574074074074074074e-12

export const millisPerSecond = 1000;
export const millisPerMinute = millisPerSecond * 60; //     60,000
export const millisPerHour = millisPerMinute * 60;   //  3,600,000
export const millisPerDay = millisPerHour * 24;      // 86,400,000

export const maxSeconds = Number.MAX_VALUE / ticksPerSecond;
export const minSeconds = Number.MIN_VALUE / ticksPerSecond;

export const maxMilliseconds = Number.MAX_VALUE / ticksPerMillisecond;
export const minMilliseconds = Number.MIN_VALUE / ticksPerMillisecond;

export const ticksPerTenthSecond = ticksPerMillisecond * 100;

export class TimeSpan {
    public static readonly zero = new TimeSpan(0);
    public static readonly maxValue = new TimeSpan(Number.MAX_VALUE);
    public static readonly minValue = new TimeSpan(Number.MIN_VALUE);

    private readonly _ticks: number;

    constructor(args?: number | [number, number, number] | [number, number, number, number] | [number, number, number, number, number]) {
        if (args === undefined) {
            this._ticks = 0;
        }
        else if (typeof args === 'number') {
            this._ticks = args;
        } else if (args.length === 3) {
            const [hours, minutes, seconds] = args;
            this._ticks = (hours * 3600 + minutes * 60 + seconds) * ticksPerSecond
        } else if (args.length === 4) {
            const [days, hours, minutes, seconds] = args;
            this._ticks = (days * 3600 * 24 + hours * 3600 + minutes * 60 + seconds) * ticksPerSecond;
        } else {
            const [days, hours, minutes, seconds, milliseconds] = args;
            this._ticks = (days * 3600 * 24 + hours * 3600 + minutes * 60 + seconds) * ticksPerSecond + milliseconds * ticksPerMillisecond;
        }
    }

    get ticks() {
        return this._ticks;
    }
    get days() {
        return Math.floor(this._ticks / ticksPerDay);
    }
    get hours() {
        return Math.floor((this._ticks / ticksPerHour) % 24);
    }
    get milliseconds() {
        return Math.floor((this._ticks / ticksPerMillisecond) % 1000);
    }
    get minutes() {
        return Math.floor((this._ticks / ticksPerMinute) % 60);
    }
    get seconds() {
        return Math.floor((this._ticks / ticksPerSecond) % 60);
    }

    get totalDays() {
        return this._ticks * daysPerTick;
    }
    get totalHours() {
        return this._ticks * hoursPerTick;
    }
    get totalMilliseconds() {
        return this._ticks * millisecondsPerTick;
    }
    get totalMinutes() {
        return this._ticks * minutesPerTick;
    }
    get totalSeconds() {
        return this._ticks * secondsPerTick;
    }

    add(ts: TimeSpan) {
        return new TimeSpan(this._ticks + ts._ticks);
    }

    subtract(ts: TimeSpan) {
        return new TimeSpan(this._ticks - ts._ticks);
    }

    multiply(factor: number) {
        return new TimeSpan(this._ticks * factor);
    }

    divide(divisor: number | TimeSpan) {
        if (divisor instanceof TimeSpan) {
            return this._ticks / divisor._ticks;
        }
        return new TimeSpan(this._ticks / divisor);
    }

    valueOf() {
        return this._ticks;
    }
    toString() {
        const days = this.days >= 10 ? this.days : '0' + this.days;
        const hours = this.hours >= 10 ? this.hours : '0' + this.hours;
        const minutes = this.minutes >= 10 ? this.minutes : '0' + this.minutes;
        const seconds = this.seconds >= 10 ? this.seconds : '0' + this.seconds;
        const milliseconds = this.milliseconds >= 100 ? this.milliseconds : this.milliseconds >= 100 ? '0' + this.milliseconds : '00' + this.milliseconds;
        return `${days}:${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    duration() {
        return new TimeSpan(this._ticks >= 0 ? this._ticks : -this._ticks);
    }

    negate() {
        return new TimeSpan(-this._ticks);
    }

    static parse(s: string) {
        const { success, value } = TimeSpan.tryParse(s);
        if (!success) {
            throw new Error(`failed to parse ${s} to a TimeSpan`);
        }
        return value;
    }
    static tryParse(s: string) {
        return {
            success: true,
            value: TimeSpan.zero
        };
    }

    static fromDays(value: number) {
        return new TimeSpan(value * ticksPerDay);
    }
    static fromHours(value: number) {
        return new TimeSpan(value * ticksPerHour);
    }
    static fromMilliseconds(value: number) {
        return new TimeSpan(value * ticksPerMillisecond);
    }
    static fromMinutes(value: number) {
        return new TimeSpan(value * ticksPerMinute);
    }
    static fromSeconds(value: number) {
        return new TimeSpan(value * ticksPerSecond);
    }
}