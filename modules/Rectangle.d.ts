import { Color } from "../utils/Color";
import { Point } from "../utils/Point";
import { Size } from "../utils/Size";
import { Element } from "./Element";
export declare class Rectangle extends Element {
    pos: Point;
    size: Size;
    color: Color;
    constructor(pos: any, size: any, color: any);
    Draw(pos: any, size: any, color: any): void;
}
