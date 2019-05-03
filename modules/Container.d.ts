import { Rectangle } from "./Rectangle";
export declare class Container extends Rectangle {
    Items: any[];
    constructor(pos: any, size: any, color: any);
    addItem(item: any): void;
    Draw(offset?: any): void;
}
