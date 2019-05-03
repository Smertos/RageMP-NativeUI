export declare class Point {
    static Parse(point: number[]): Point;
    static Parse(point: {
        X: number;
        Y: number;
    }): Point;
    X: number;
    Y: number;
    constructor(x: number, y: number);
}
