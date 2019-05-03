import { ILiteEvent } from "../utils/LiteEvent";
import { UIMenuItem } from "./UIMenuItem";
export declare class UIMenuCheckboxItem extends UIMenuItem {
    private readonly _checkedSprite;
    private readonly OnCheckedChanged;
    readonly CheckedChanged: ILiteEvent;
    Checked: boolean;
    constructor(text: string, check?: boolean, description?: string);
    SetVerticalPosition(y: number): void;
    Draw(): void;
}
