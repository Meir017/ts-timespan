
import { TimeSpan } from '../src/timespan';

describe('the TimeSpan class', () => {
    describe('the ctor', () => {
        it('should work without arguments', () => {
            verifyTimeSpan(new TimeSpan(), 0, 0, 0, 0, 0);
        });
        it('should work with (number) arguments', () => {
            verifyTimeSpan(new TimeSpan(999999999999999), 1157, 9, 46, 39, 999);
        });
        it('should work with ([number, number, number]) arguments', () => {
            verifyTimeSpan(new TimeSpan([10, 9, 8]), 0, 10, 9, 8, 0);
        });
        it('should work with ([number, number, number, number]) arguments', () => {
            verifyTimeSpan(new TimeSpan([10, 9, 8, 7]), 10, 9, 8, 7, 0);
        });
        it('should work with ([number, number, number, number, number]) arguments', () => {
            verifyTimeSpan(new TimeSpan([10, 9, 8, 7, 6]), 10, 9, 8, 7, 6);
        });
    });

    describe('the .ticks property', () => {
        it('should work with zero', () => {
            expect(TimeSpan.zero.ticks).toBe(0);
        });
        it('should work with positive ticks', () => {
            expect(new TimeSpan(6).ticks).toBe(6);
        });
        it('should work with negative ticks', () => {
            expect(new TimeSpan(-6).ticks).toBe(-6);
        });
    });

    describe('the .days property', () => {
        it('should work with zero', () => {
            expect(TimeSpan.zero.days).toBe(0);
        });
        it('should work with whole days', () => {
            expect(new TimeSpan([6, 0, 0, 0]).days).toBe(6);
        });
        it('should work with negative days', () => {
            expect(new TimeSpan([-6, 0, 0, 0]).days).toBe(-6);
        });
        it('should round down days', () => {
            expect(new TimeSpan([6, 12, 15, 0]).days).toBe(6);
        });
    });

    describe('the .hours property', () => {
        it('should work with zero', () => {
            expect(TimeSpan.zero.hours).toBe(0);
        });
        it('should work with whole hours', () => {
            expect(new TimeSpan([6, 0, 0]).hours).toBe(6);
        });
        it('should work with negative hours', () => {
            expect(new TimeSpan([-6, 0, 0]).hours).toBe(-6);
        });
        it('should round down hours', () => {
            expect(new TimeSpan([6, 30, 15]).hours).toBe(6);
        });
    });

    describe('the .minutes property', () => {
        it('should work with zero', () => {
            expect(TimeSpan.zero.minutes).toBe(0);
        });
        it('should work with whole minutes', () => {
            expect(new TimeSpan([0, 6, 0]).minutes).toBe(6);
        });
        it('should work with negative minutes', () => {
            expect(new TimeSpan([0, -6, 0]).minutes).toBe(-6);
        });
        it('should round down minutes', () => {
            expect(new TimeSpan([2, 6, 15]).minutes).toBe(6);
        });
    });

    describe('the .seconds property', () => {
        it('should work with zero', () => {
            expect(TimeSpan.zero.seconds).toBe(0);
        });
        it('should work with whole seconds', () => {
            expect(new TimeSpan([0, 0, 6]).seconds).toBe(6);
        });
        it('should work with negative seconds', () => {
            expect(new TimeSpan([0, 0, -6]).seconds).toBe(-6);
        });
        it('should round down seconds', () => {
            expect(new TimeSpan([2, 6, 15, 6, 156]).seconds).toBe(6);
        });
    });
})

function verifyTimeSpan(ts: TimeSpan, days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {
    expect(ts.days).toBe(days, `expected days ${ts.days} to be ${days}`);
    expect(ts.hours).toBe(hours, `expected hours ${ts.hours} to be ${hours}`);
    expect(ts.minutes).toBe(minutes, `expected minutes ${ts.minutes} to be ${minutes}`);
    expect(ts.seconds).toBe(seconds, `expected seconds ${ts.seconds} to be ${seconds}`);
    expect(ts.milliseconds).toBe(milliseconds, `expected milliseconds ${ts.milliseconds} to be ${milliseconds}`);
}