import { Color } from "../utils/Color";
import { Point } from "../utils/Point";
import { Element } from "./Element";
export declare class Text extends Element {
    caption: string;
    pos: Point;
    scale: number;
    color: Color;
    font: number;
    centered: boolean;
    constructor(caption: any, pos: any, scale: any, color: any, font: any, centered: any);
    Draw(caption: any, pos: any, scale: any, color: any, font: any, centered: any): void;
}
