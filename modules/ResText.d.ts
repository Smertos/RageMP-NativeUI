import { Size } from "../utils/Size";
import { Text } from "./Text";
export declare enum Alignment {
    Left = 0,
    Centered = 1,
    Right = 2
}
export declare class ResText extends Text {
    TextAlignment: Alignment;
    DropShadow: boolean;
    Outline: boolean;
    WordWrap: Size;
    constructor(caption: any, pos: any, scale: any, color?: any, font?: any, justify?: any);
    Draw(): void;
    Draw(offset: Size): void;
    Draw(caption: any, pos: any, scale: any, color: any, font: any, arg2: any): void;
    static AddLongString(str: string): void;
}
